import fsPromises from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

import registers from '@/../registers.json';

const dataFilePath = path.join(process.cwd(), './registers.json');

export async function GET(request, context) {
	const { params } = context;
	const cpf = params.id;

	if (registers.indexOf(cpf) >= 0) {
		return NextResponse.json({
			message: `# ${cpf} Já cadastrado`,
			insert: false,
		});
	} else {
		registers.push(cpf);

		await fsPromises.writeFile(dataFilePath, JSON.stringify(registers));

		return NextResponse.json({
			message: `# ${cpf} cadastrado com sucesso!`,
			insert: true,
		});
	}
}
