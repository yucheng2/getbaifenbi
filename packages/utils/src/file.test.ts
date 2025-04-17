import { describe, test, expect } from 'vitest'
import { getAllFiles } from ".."
import path from 'node:path'

describe('getAllFiles', () => {
  test('should return all files in directory', () => {
    const folderPath = path.resolve(__dirname, '../data')
    const files = getAllFiles(folderPath)
    // 有值
    expect(files.length).toBeGreaterThan(0)
  })
})
