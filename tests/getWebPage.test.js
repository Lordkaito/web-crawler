import getWebpage from "../index";

const URL = "https://news.ycombinator.com/";

test("gets web page", async () => {
  const getWebpageResult = await getWebpage(URL);

  expect(getWebpageResult).toBe(URL);
  return;
});

test("gets the 30 rows", async () => {
  const getWebpageResult = await getWebpage(URL);

  expect(getWebpageResult).toHaveLength(30);
  return;
});
