import { describe, it, expect } from 'vitest';
import { excelToJson } from './excel';
import * as path from 'path';
import * as fs from 'fs';


describe('excelToJson', () => {
  it('正常转换Excel文件', async () => {
    const testFile = path.join(__dirname, '../data/res.xlsx');
    const result = await excelToJson(testFile);
    expect(result).toBeInstanceOf(Array);
    result.forEach(sheet => {
      expect(sheet).toHaveProperty('sheetName');
      expect(sheet).toHaveProperty('data');
      expect(sheet.data).toBeInstanceOf(Array);
    });
  });

  it('处理不存在的文件', async () => {
    const invalidPath = path.join(__dirname, 'nonexistent.xlsx');
    await expect(excelToJson(invalidPath)).rejects.toThrow();
  });

  
  it('dev', async () => {
    const testFile = path.join(__dirname, '../data/res.xlsx');
    const result = await excelToJson(testFile);
    // 获取result第一个表
    const firstSheet = result[0]?.data || [];
    // 把result转成json文件，方便查看
    const json = JSON.stringify(firstSheet, null, 2);
    const jsonFile = path.join(__dirname, '../data/res.json');
    fs.writeFileSync(jsonFile, json);
  });

});