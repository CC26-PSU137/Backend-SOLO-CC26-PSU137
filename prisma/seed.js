import prisma from '../src/config/prisma.js';

async function main() {
  await prisma.quiz.createMany({
    data: [
      {
        question:
          'Sisa makanan termasuk jenis sampah apa?',

        optionA: 'Organik',
        optionB: 'Anorganik',
        optionC: 'B3',

        correctAnswer: 'A',

        explanation:
          'Sisa makanan mudah terurai secara alami.',
      },

      {
        question:
          'Botol kaca termasuk jenis sampah apa?',

        optionA: 'Organik',
        optionB: 'Anorganik',
        optionC: 'B3',

        correctAnswer: 'B',

        explanation:
          'Botol kaca sulit terurai dan termasuk sampah anorganik.',
      },

      {
        question:
          'Lampu neon bekas termasuk jenis sampah apa?',

        optionA: 'Organik',
        optionB: 'Anorganik',
        optionC: 'B3',

        correctAnswer: 'C',

        explanation:
          'Lampu neon mengandung bahan berbahaya sehingga termasuk B3.',
      },

      {
        question:
          'Daun kering dapat dimanfaatkan menjadi?',

        optionA: 'Kompos',
        optionB: 'Baterai',
        optionC: 'Kaca',

        correctAnswer: 'A',

        explanation:
          'Daun kering dapat diolah menjadi pupuk kompos.',
      },

      {
        question:
          'Plastik membutuhkan waktu yang sangat lama untuk?',

        optionA: 'Menguap',
        optionB: 'Terurai',
        optionC: 'Mencair',

        correctAnswer: 'B',

        explanation:
          'Plastik sulit terurai secara alami di lingkungan.',
      },

      {
        question:
          'Baterai bekas sebaiknya dibuang ke?',

        optionA: 'Tempat sampah biasa',
        optionB: 'Sungai',
        optionC: 'Tempat khusus limbah B3',

        correctAnswer: 'C',

        explanation:
          'Baterai bekas mengandung zat berbahaya dan harus dibuang di tempat khusus.',
      },

      {
        question:
          'Kertas bekas dapat didaur ulang menjadi?',

        optionA: 'Kertas baru',
        optionB: 'Bensin',
        optionC: 'Minyak goreng',

        correctAnswer: 'A',

        explanation:
          'Kertas bekas dapat diolah kembali menjadi kertas baru.',
      },

      {
        question:
          'Tujuan memilah sampah adalah?',

        optionA: 'Membuat lingkungan lebih kotor',
        optionB: 'Mempermudah daur ulang',
        optionC: 'Membuang waktu',

        correctAnswer: 'B',

        explanation:
          'Pemilahan sampah membantu proses pengolahan dan daur ulang.',
      },

      {
        question:
          'Kaleng minuman termasuk jenis sampah?',

        optionA: 'Organik',
        optionB: 'Anorganik',
        optionC: 'B3',

        correctAnswer: 'B',

        explanation:
          'Kaleng terbuat dari logam yang sulit terurai.',
      },

      {
        question:
          'Membuang sampah sembarangan dapat menyebabkan?',

        optionA: 'Lingkungan bersih',
        optionB: 'Banjir dan pencemaran',
        optionC: 'Udara segar',

        correctAnswer: 'B',

        explanation:
          'Sampah yang dibuang sembarangan dapat menyumbat saluran air dan mencemari lingkungan.',
      },
    ],
  });

  console.log('Quiz seeded!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });