import { account, ID } from './appwrite';
import { Models } from 'appwrite';
import router from 'next/router';
import { toast } from 'react-toastify';

export async function checkSession(): Promise<boolean> {
  try {
    const session = await account.getSession('current');
    return !!session;
  } catch {
    console.debug('[Auth] Sessão não encontrada');
    return false;
  }
}

export function getUserAvatar(user: Models.User<Models.Preferences> | null): string {
  if (!user) return '/images/avatar-default.svg';
  return user.prefs?.avatar || '/images/avatar-default.svg';
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    console.debug('[Auth] Iniciando processo de login');
    
    try {
      const currentSession = await account.getSession('current');
      if (currentSession) {
        console.debug('[Auth] Usuário já está logado');
        return true;
      }
    } catch {
      console.debug('[Auth] Nenhuma sessão atual encontrada');
    }

    await account.createEmailPasswordSession(email, password);
    console.debug('[Auth] Sessão criada com sucesso');
    
    // Aguarda um momento para garantir que a sessão seja estabelecida
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verifica se a sessão foi estabelecida corretamente
    const session = await account.getSession('current');
    if (!session) {
      throw new Error('Falha ao estabelecer sessão');
    }
    
    await account.get();
    console.debug('[Auth] Sessão estabelecida com sucesso');
    toast.success('Login realizado com sucesso!');
    return true;
  } catch (error) {
    console.error('[Auth] Erro no login:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('missing scope (account)')) {
        toast.error('Erro de permissão. Por favor, tente novamente mais tarde.');
      }
      if (error.message.includes('Invalid credentials')) {
        toast.error('Email ou senha incorretos.');
      }
      toast.error('Não foi possível fazer login. Tente novamente.');
    } else {
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
    return false;
  }
}

export async function register(email: string, password: string, name: string): Promise<boolean> {
  try {
    console.debug('[Auth] Iniciando processo de registro');

    try {
      await account.get();
      toast.error('Este email já está registrado.');
      return false;
    } catch {
      console.debug('[Auth] Email disponível para registro');
    }

    await account.create(ID.unique(), email, password, name);
    console.debug('[Auth] Conta criada com sucesso');
    toast.success('Conta criada com sucesso!');
    
    return await login(email, password);
  } catch (error) {
    console.error('[Auth] Erro no registro:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('missing scope (account)')) {
        toast.error('Erro de permissão. Por favor, tente novamente mais tarde.');
      }
      if (error.message.includes('Email already exists')) {
        toast.error('Este email já está registrado.');
      }
      toast.error('Não foi possível criar a conta. Tente novamente.');
    } else {
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await account.deleteSession('current');
    console.debug('[Auth] Logout realizado com sucesso');
    toast.success('Logout realizado com sucesso!');
    router.push('/');
  } catch {
    console.error('[Auth] Erro no logout');
    toast.error('Não foi possível fazer logout. Tente novamente.');
  }
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const user = await account.get();
    return user;
  } catch {
    console.debug('[Auth] Usuário não encontrado');
    return null;
  }
}