import { PrismaClient } from "@prisma/client";
import example from "./example.json";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const { id: categoryId } = await prisma.category.create({
    data: {
      name: "数学",
    },
  });

  const { id: authorId } = await prisma.user.create({
    data: {
      name: "小马",
      avatar:
        "https://p3-passport.byteimg.com/img/user-avatar/585e1491713363bc8f67d06c485e8260~100x100.awebp",
    },
  });

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
      categoryId,
      authorId,
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
