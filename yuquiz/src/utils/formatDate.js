export default function formatDate(dateString) {
    const date = new Date(dateString);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // 오전/오후 계산
    const period = hours >= 12 ? '오후' : '오전';
  
    // 12시간제로 변환
    const formattedHours = hours % 12 || 12;
  
    // 두 자리 숫자로 맞추기
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
  
    return `${period} ${formattedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  