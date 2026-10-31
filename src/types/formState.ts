// 서버 액션이 useActionState 로 돌려주는 결과. 화면과 서버가 같은 모양을 쓴다.
export interface FormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export const INITIAL_FORM_STATE: FormState = { status: 'idle' };
