// 선택 영역 복사(구식). 클립보드 API 가 없거나 권한이 막힌 곳(카카오톡 인앱 브라우저 일부)에서 쓴다.
function copyWithSelection(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;opacity:0;left:-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

// 클립보드 복사. 클립보드 API 가 실패하면 선택 영역 복사로 한 번 더 시도한다.
export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // 권한 거부 등 — 아래 방식으로 넘어간다
    }
  }
  return copyWithSelection(text);
}
