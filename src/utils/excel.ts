import * as XLSX from 'xlsx';
// 导出excel
export function exportExcel<T = any>(data: T[], name: string) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, name);
  XLSX.writeFile(wb, `${name}.xlsx`);
}
