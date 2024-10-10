import fsPromises from 'fs/promises';
import path from 'path';

import { NextResponse } from 'next/server';

import cpfs from '@/../cpfs.json';

const dataFilePath = path.join(process.cwd(), './cpfs.json');

export async function GET(request, context) {
	const { params } = context;
	const cpf = params.id;

	// await fsPromises.writeFile(dataFilePath, '["123","456", "789"]');

	if (cpfs.indexOf(cpf) >= 0) {
		return NextResponse.json({
			message: `CPF ${cpf} Já cadastrado`,
			insert: false,
		});
	} else {
		cpfs.push(cpf);

		await fsPromises.writeFile(dataFilePath, JSON.stringify(cpfs));

		return NextResponse.json({
			message: `CPF ${cpf} cadastrado com sucesso!`,
			insert: true,
		});
	}

	return NextResponse.json(cpfs);
}
