/**
 * JWT에서 Bearer 접두사를 제거하고, 페이로드를 디코딩합니다.
 * @param {string} tokenWithBearer - "Bearer " 접두사가 포함된 토큰
 * @returns {object|null} - 디코딩된 페이로드 객체 또는 null
 */

function removeBearer(tokenWithBearer) {
    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
      return tokenWithBearer.slice(7); // "Bearer " 길이는 7
    }
    return null; // 토큰이 없거나 "Bearer "로 시작하지 않으면 null 반환
  }

export default function parseJwtWithBearer(tokenWithBearer) {
    const token = removeBearer(tokenWithBearer);
    if (!token) return null;
  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid JWT:', error);
      return null;
    }
  };
  