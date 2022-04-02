/**
 * Todo.
 *  생성자, set 시에 유효성 검사가 필요합니다.
 *  필요하다면 사용합니다.
 */
export class AccessToken {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  setToken(value: string): void {
    this.value = value;
  }

  getToken(): string {
    return this.value;
  }
}
