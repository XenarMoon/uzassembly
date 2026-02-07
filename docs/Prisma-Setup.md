Prisma setup and migration guide

1. Install dependencies (locally):

```bash
npm install
npm install -D prisma
npm install @prisma/client
```

2. Create `.env` file from `.env.example` and set `DATABASE_URL` to your Postgres database.

3. Generate Prisma client and run migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

- If you only want to push schema without creating migration (less recommended for prod):

```bash
npx prisma db push
```

4. Use Prisma client in code:

```ts
import prisma from '@/lib/prisma'
await prisma.user.create({ data: { email: 'admin@example.com', password: 'hashed' } })
```

5. Notes:
- In production, set `DATABASE_URL` to your managed Postgres instance.
- Do not commit `.env` to repository.
- For large datasets or existing DB, consider `prisma migrate deploy` in CI/CD.
 - For media uploads in production, set these env vars for S3 usage:
	 - `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
 - The upload endpoint will use S3 when `AWS_S3_BUCKET` is provided; otherwise it falls back to `public/uploads`.
