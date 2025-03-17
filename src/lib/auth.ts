import { account, ID } from './appwrite';
import { Models } from 'appwrite';

let lastLoginAttempt = 0;
const LOGIN_COOLDOWN = 2000; // 2 segundos de cooldown entre tentativas

export async function checkSession(): Promise<boolean> {
  try {
    const session = await account.getSession('current');
    return !!session;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return false;
  }
}

export function getUserAvatar(user: Models.User<Models.Preferences> | null): string {
  if (!user) return '/images/avatar_default.svg';
  return user.prefs?.avatar || '/images/avatar_default.svg';
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    console.log('Tentando fazer login com:', email);
    const session = await account.createSession(email, password);
    console.log('Sessão criada com sucesso:', session);
    return true;
  } catch (error) {
    console.error('Erro detalhado no login:', error);
    if (error instanceof Error) {
      throw new Error('Email ou senha inválidos. Por favor, verifique suas credenciais.');
    }
    throw new Error('Erro ao fazer login. Tente novamente.');
  }
}

export async function register(email: string, password: string, name: string): Promise<boolean> {
  try {
    console.log('Tentando criar conta para:', email);
    const user = await account.create('unique()', email, password, name);
    console.log('Conta criada com sucesso:', user);
    
    // Faz login automaticamente após o registro
    const success = await login(email, password);
    return success;
  } catch (error) {
    console.error('Erro detalhado no registro:', error);
    if (error instanceof Error) {
      throw new Error('Erro ao criar conta. Por favor, tente novamente.');
    }
    throw new Error('Erro ao registrar. Tente novamente.');
  }
}

export async function logout(): Promise<void> {
  try {
    await account.deleteSession('current');
    console.log('Logout realizado com sucesso');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw new Error('Erro ao fazer logout. Tente novamente.');
  }
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const user = await account.get();
    console.log('Usuário atual:', user);
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
} 