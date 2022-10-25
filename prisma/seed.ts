import { PrismaClient } from "@prisma/client";
import example from "./example2.json";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // const { id: categoryId } = await prisma.category.create({
  //   data: {
  //     name: "设计",
  //   },
  // });

  const chapters = example.data.outlines.reduce((res, item) => {
    item.lectures.forEach((lecture) => {
      res.push({
        title: lecture.title ?? lecture.en_title ?? "",
        cover: lecture.resource.cover_url,
        url: lecture.resource.content[0].url,
      });
    });

    return res;
  }, []);

  console.log(chapters);

  await prisma.video.create({
    data: {
      title: example.data.title,
      desc: example.data.brief,
      pic: example.data.cover_url,
      categoryId: 1,
      authorId: "cl95b4ny10000fjnuhm7rvys5",
      chapter: {
        createMany: {
          data: chapters,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
