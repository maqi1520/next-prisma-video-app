import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import VideoList from "@/components/video-list";

const mockData = [
  {
    id: 1,
    title: "高中数学：代数基础",
    desc: "代数是既美丽有重要的学习领域，拥有着无限的应用可能。你可以花上一辈子的时间来研究和探索它（真的有人这样做了）。如果你不是他们中的一员，只是想学习一下，了解和联系代数的最核心概念，这里你来对了。想要准备高中或者大学考试的朋友，这里对你们很理想。这里覆盖了代数和相关代数预科、几何的基础概念。如果你想看更多的内容，还可以去看看代数1和代数2。",
    pic: "https://gcdp.oss-cn-qingdao.aliyuncs.com/201602/18/1455776864827_2156.jpg",
    authorId: "cl95b4ny10000fjnuhm7rvys5",
    categoryId: 1,
    level: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      id: "cl95b4ny10000fjnuhm7rvys5",
      name: "maqibin",
      email: "164377467@qq.com",
      emailVerified: new Date(),
      image: "https://avatars.githubusercontent.com/u/9312044?v=4",
    },
  },
];

describe("VideoList", () => {
  it("it should be render", () => {
    const { container } = render(<VideoList data={[]} />);

    expect(container).toMatchSnapshot();
  });

  it("it should be render with data", () => {
    render(<VideoList data={mockData} />);

    mockData.forEach((item) => {
      expect(screen.getAllByText(item.title)).toBeDefined();
      expect(screen.getAllByAltText(item.title)).toBeDefined();
      expect(screen.getAllByText(item.author.name)).toBeDefined();
    });
  });

  it("it should be render with className", () => {
    const mockClassName = "mockClassName";
    const { container } = render(
      <VideoList data={mockData} className={mockClassName} />
    );

    expect(container.getElementsByClassName(mockClassName).length).toBe(1);
  });

  it("it should be editable with editable props", () => {
    const { container } = render(<VideoList data={mockData} editable />);

    expect(screen.queryAllByRole("edit")).toHaveLength(mockData.length);
    expect(screen.queryAllByRole("delete")).toHaveLength(mockData.length);
  });

  it("it should be has 'test-vertical' class when horizontal is false ", () => {
    const { container } = render(
      <VideoList data={mockData} horizontal={false} />
    );

    expect(container.getElementsByClassName("test-vertical")).toHaveLength(
      mockData.length
    );
  });

  it("it should be has 'test-horizontal' class when horizontal is false ", () => {
    const { container } = render(<VideoList data={mockData} horizontal />);

    expect(container.getElementsByClassName("test-horizontal")).toHaveLength(
      mockData.length
    );
  });

  it("it should not be editable without editable props", () => {
    render(<VideoList data={[]} editable={false} />);

    expect(screen.queryByRole("edit")).toBeNull();
    expect(screen.queryByRole("delete")).toBeNull();
  });
});
