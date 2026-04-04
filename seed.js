const prisma = require("./lib/prisma.js");

async function main() {
  await prisma.character.deleteMany({});
  await prisma.image.deleteMany({});
  const image = await prisma.image.create({
    data: {
      imagename: "amongus",
      imgUrl: "placeholderURL",
      characters: {
        create: [
          {
            name: "dead",
            locationX: 1200,
            locationY: 1900,
            radius: 100,
          },
          {
            name: "black",
            locationX: 200,
            locationY: 400,
            radius: 100,
          },
          {
            name: "white",
            locationX: 850,
            locationY: 2975,
            radius: 100,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
