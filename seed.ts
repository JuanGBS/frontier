import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import "dotenv/config";

// Configuração de conexão com o banco
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Função principal para rodar a seed
const seedDatabase = async () => {
  try {
    console.log("Iniciando seed do banco de dados...");

    // Apagar todos os dados existentes (opcional, comente se não precisar)
    await db.delete(schema.userProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.courses);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.userSubscription);

    // Inserir dados de exemplo
    const courses = await db.insert(schema.courses).values([
      { title: "Português", imageSrc: "/pt.svg" },
      { title: "Espanhol", imageSrc: "/es.svg" }
    ]).returning();

    for (const course of courses) {
      const units = await db.insert(schema.units).values([
        {
          courseId: course.id,
          title: "Unit 1",
          description: `Aprenda o básico de ${course.title}`,
          order: 1
        },
        {
          courseId: course.id,
          title: "Unit 2",
          description: `Aprenda o intermediário de ${course.title}`,
          order: 2
        }
      ]).returning();

      for (const unit of units) {
        const lessons = await db.insert(schema.lessons).values([
          { unitId: unit.id, title: "Substantivos", order: 1 },
          { unitId: unit.id, title: "Verbos", order: 2 }
        ]).returning();

        for (const lesson of lessons) {
          await db.insert(schema.challenges).values([
            { lessonId: lesson.id, type: "SELECT", question: "Qual é 'o homem'?", order: 1 },
            { lessonId: lesson.id, type: "SELECT", question: "Qual é 'a mulher'?", order: 2 }
          ]);
        }
      }
    }

    console.log("Seed concluída com sucesso!");
  } catch (error) {
    console.error("Erro ao rodar seed:", error);
  }
};

void seedDatabase();
