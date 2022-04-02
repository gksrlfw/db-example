/**
 * dataloader 에 관한 util 메서드 모음입니다.
 */
export namespace DataloaderUtil {
  // export function responseOne<T, K>(keys: T[], values: K[], property: string): K[][] {
  // }

  /**
   * dataloader 의 반환 형태를 맞춥니다.
   * K[] -> K[][]
   * @param keys
   * @param values
   * @param property
   */
  export function responseList<T, K>(
    keys: T[],
    values: K[],
    property: string,
  ): K[][] {
    return keys.map((key: T) => {
      const valuesOnKey = values.filter((value) => value[property] === key);
      if (!valuesOnKey || !valuesOnKey.length) {
        return null;
      }

      return valuesOnKey;
    });
  }
}
