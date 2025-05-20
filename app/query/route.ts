import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
	try {
		const result = await listInvoices();
		return Response.json(result);
	} catch (error) {
		console.error('Database error:', error);
		return Response.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
