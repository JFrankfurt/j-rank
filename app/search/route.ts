import { readFileSync } from "fs";
import {resolve} from 'path'
import { NextResponse } from 'next/server'

let data: Array<any>;
try {
  const mockData = readFileSync(resolve('app/athletes.json'), { encoding: 'utf-8' });
  data = JSON.parse(mockData);
} catch (error) {
  console.error('Failed to load or parse athletes.json:', error);
  data = [];
}

const searchMockData = (searchString: string) => {
    const lowerCaseSearch = searchString.toLowerCase();
    return data.filter(record => 
         (record.guid && record.guid.toLowerCase().includes(lowerCaseSearch)) ||
        (record.firstName && record.firstName.toLowerCase().includes(lowerCaseSearch)) ||
        (record.lastName && record.lastName.toLowerCase().includes(lowerCaseSearch)) ||
        (record.team && record.team.name && record.team.name.toLowerCase().includes(lowerCaseSearch)) ||
        (record.seed !== undefined && record.seed.toString() === lowerCaseSearch)
    );
  };
  
  export async function GET(request: Request) {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    return NextResponse.json({
        "status": "SUCCESS",
        "response": search ? searchMockData(search) : data
      })
}