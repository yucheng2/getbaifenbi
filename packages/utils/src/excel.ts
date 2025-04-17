import ExcelJS from 'exceljs';

/**
 * 把excel文件转换成json文件
*/
export function excelToJson(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(filePath)
      .then(() => {
        const result: any[] = [];
        workbook.eachSheet((worksheet) => {
          const sheetData: any[] = [];
          let headers: string[] = [];
          
          // 获取表头
          const headerRow = worksheet.getRow(1);
          headerRow.eachCell((cell) => {
            headers.push(cell.text);
          });

          // 处理数据行
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // 跳过表头
            const rowData: any = {};
            row.eachCell((cell, colNumber) => {
              rowData[headers[colNumber - 1]] = cell.value;
            });
            sheetData.push(rowData);
          });

          result.push({
            sheetName: worksheet.name,
            data: sheetData
          });
        });
        resolve(result);
      })
      .catch(reject);
  });
}