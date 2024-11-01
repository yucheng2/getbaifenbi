// 获取dist目录中的文件
import * as fs from 'fs';
import * as path from 'path';
import {getList} from "./readExcel";
import {Res} from "./types";

// 文件夹路径
const folderPath = path.resolve(__dirname, 'data')

// 递归获取文件夹中的所有文件
function getAllFiles(folder: string, files: string[] = []): string[] {
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

// 获取文件夹中所有的文件
const allFiles = getAllFiles(folderPath);


interface Item {
    GRID_SQMC: string;
    GRID_ATTRIBUTE: string;
    CREATE_BY_ID: string;
    GRID_QX: string;
    GRID_NAME: string;
    GRID_SQBM: string;
    GRID_INFO: string;
    VAILD_FLAG: string;
    GRID_NO: string;
    GRID_ID: string;
    CREATE_BY: string;
    GRID_SQ: string;
    CREATE_TIME: number;
    GRID_TYPE: string;
    GRID_JD: string;
}

// 保存文件, 保存到dist目录中
const data = getList().map((item) => {
    const newItem = item as Item
    return {
        id: newItem.GRID_NO,
        name: newItem.GRID_NAME,
        sqmc: newItem.GRID_SQMC
    }
})

allFiles.forEach(async (path) => {
    const json = (await import(path)).default
    const newJson = JSON.parse(JSON.stringify(json))
    newJson.forEach((item:Res)=>{
        data.forEach((dataItem)=>{
            if(dataItem.name === item.name){
                item.id = dataItem.id
            }
        })
    })
    const newPath = path.replace('data', 'dist')
    // 保存json
    fs.writeFile(newPath, JSON.stringify(newJson), (err) => {
        if (err) {
            console.log(err)
        }
    })
})
