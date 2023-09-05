const {PrismaClient} = require("@prisma/client")

const db = new PrismaClient();

async function main() {
    try {
        await db.dataLog.createMany({
            data: [
                {
                    temp: "30",
                    humidity: "70",
                    brightness: "1200",
                    time: "2023-09-05T12:00:00Z",
                },
                {
                    temp: "50",
                    humidity: "50",
                    brightness: "800",
                    time: "2023-09-05T12:00:00Z",
                },
            ]
        })
    } catch(error) {
        console.error("Error seeding default", error);
    } finally {
        await db.$disconnect();
    }
}

main();