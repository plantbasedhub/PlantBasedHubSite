import { account, ID } from './appwrite';
import { Models } from 'appwrite';

let lastLoginAttempt = 0;
const LOGIN_COOLDOWN = 2000; // 2 segundos de cooldown entre tentativas

export async function checkSession(): Promise<boolean> {
  try {
    const session = await account.getSession('current');
    return !!session;
  } catch {
    return false;
  }
}

export function getUserAvatar(user: Models.User<Models.Preferences> | null): string {
  if (!user) return '/images/avatar-default.svg';
  
  // Se o usuário tiver uma imagem de perfil, retorna ela
  if (user.prefs?.avatar) {
    return user.prefs.avatar;
  }
  
  // Se não tiver, retorna a imagem padrão
  return '/images/avatar-default.svg';
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    // Verifica se já tentou fazer login recentemente
    const now = Date.now();
    if (now - lastLoginAttempt < LOGIN_COOLDOWN) {
      await new Promise(resolve => setTimeout(resolve, LOGIN_COOLDOWN - (now - lastLoginAttempt)));
    }
    
    lastLoginAttempt = Date.now();
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Login - Sessão criada:', session);
    
    // Força uma atualização da página para garantir que o cookie seja definido
    window.location.href = '/feed';
    return true;
  } catch (error) {
    console.error('Erro no login:', error);
    if (error instanceof Error) {
      if (error.message.includes('Rate limit')) {
        throw new Error('Muitas tentativas de login. Por favor, aguarde alguns segundos antes de tentar novamente.');
      }
    }
    return false;
  }
}

export async function register(email: string, password: string, name: string): Promise<boolean> {
  try {
    // Verifica se já tentou fazer login recentemente
    const now = Date.now();
    if (now - lastLoginAttempt < LOGIN_COOLDOWN) {
      await new Promise(resolve => setTimeout(resolve, LOGIN_COOLDOWN - (now - lastLoginAttempt)));
    }
    
    lastLoginAttempt = Date.now();
    await account.create(ID.unique(), email, password, name);
    await account.createVerification('https://plantbasedhub.store/verify');
    return await login(email, password);
  } catch (error) {
    console.error('Erro no registro:', error);
    if (error instanceof Error) {
      if (error.message.includes('Rate limit')) {
        throw new Error('Muitas tentativas de registro. Por favor, aguarde alguns segundos antes de tentar novamente.');
      }
    }
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    const hasSession = await checkSession();
    if (hasSession) {
      await account.deleteSession('current');
    }
    // Força uma atualização da página para garantir que o cookie seja removido
    window.location.href = '/';
  } catch {
    window.location.href = '/';
  }
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const hasSession = await checkSession();
    if (!hasSession) return null;
    return await account.get();
  } catch {
    return null;
  }
} 