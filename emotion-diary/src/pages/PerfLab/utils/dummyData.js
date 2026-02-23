export function makeDummyDiaries(count) {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    return {
      id,
      createdDate: now - i * 60_000,
      emotionId: (i % 5) + 1,
      content: `테스트 일기 ${id} - ${"내용 ".repeat((i % 20) + 1)}`,
    };
  });
}
