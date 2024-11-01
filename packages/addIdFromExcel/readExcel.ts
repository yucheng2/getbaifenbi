// 读取excel中的内容
import * as path from 'path';
import * as xlsx from 'xlsx';

export function getList(){
    const data = xlsx.readFile(
        path.resolve(__dirname, 'excel', '网格信息.xlsx'),
    )
    const list = xlsx.utils.sheet_to_json(data.Sheets['Sheet1'])
    return list
}