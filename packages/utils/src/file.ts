import * as fs from 'node:fs'
import * as path from 'node:path'

// 递归获取文件夹中的所有文件
// const folderPath = path.resolve(__dirname, 'data')
export function getAllFiles(folder: string, files: string[] = []): string[] {
    // 读取文件夹中的所有文件和子文件夹
    const items = fs.readdirSync(folder, {withFileTypes: true});

    // 遍历文件和子文件夹
    for (const item of items) {
        const res = path.resolve(folder, item.name);

        // 如果是文件，则添加到文件列表中
        if (item.isFile()) {
            files.push(res);
        } else if (item.isDirectory()) {
            // 如果是文件夹，则递归获取文件夹中的所有文件
            files = getAllFiles(res, files);
        }
    }

    return files;
}
