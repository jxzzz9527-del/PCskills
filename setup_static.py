#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
將靜態資源複製到 share/static 目錄
執行方式：python setup_static.py
"""
import os
import shutil
import sys
from pathlib import Path

def main():
    # 獲取腳本所在目錄（share 目錄）
    script_dir = Path(__file__).parent.absolute()
    share_dir = script_dir
    
    # 計算相對路徑到 web/static
    # share 在 web/templates/share，所以需要回到 web/static
    web_dir = share_dir.parent.parent  # 從 share 回到 templates，再回到 web
    static_source = web_dir / "static"
    static_dest = share_dir / "static"
    
    print("=" * 50)
    print("複製靜態資源到 share/static")
    print("=" * 50)
    print(f"來源: {static_source}")
    print(f"目標: {static_dest}")
    print()
    
    if not static_source.exists():
        print(f"錯誤: 找不到來源目錄 {static_source}")
        return 1
    
    # 創建目標目錄結構
    static_dest.mkdir(parents=True, exist_ok=True)
    (static_dest / "mouse-click").mkdir(parents=True, exist_ok=True)
    (static_dest / "mouse-drag").mkdir(parents=True, exist_ok=True)
    (static_dest / "mouse-wheel").mkdir(parents=True, exist_ok=True)
    (static_dest / "games" / "copy-paste-hero").mkdir(parents=True, exist_ok=True)
    (static_dest / "games" / "typing-hero").mkdir(parents=True, exist_ok=True)
    print("✓ 目錄結構創建完成")
    
    # 複製單個文件
    files_to_copy = [
        "接水果背景.png",
        "接水果推車.png",
    ]
    
    print("\n複製文件...")
    for filename in files_to_copy:
        src = static_source / filename
        dst = static_dest / filename
        try:
            if src.exists():
                shutil.copy2(src, dst)
                print(f"  ✓ {filename}")
            else:
                print(f"  ✗ 找不到: {filename}")
        except Exception as e:
            print(f"  ✗ 複製失敗 {filename}: {e}")
    
    # 複製目錄
    dirs_to_copy = [
        ("mouse-click", "mouse-click"),
        ("mouse-drag", "mouse-drag"),
        ("mouse-wheel", "mouse-wheel"),
        ("games/copy-paste-hero", "games/copy-paste-hero"),
        ("games/typing-hero", "games/typing-hero"),
    ]
    
    print("\n複製目錄...")
    for src_dir, dst_dir in dirs_to_copy:
        src_path = static_source / src_dir
        dst_path = static_dest / dst_dir
        
        try:
            if src_path.exists() and src_path.is_dir():
                if dst_path.exists():
                    shutil.rmtree(dst_path)
                shutil.copytree(src_path, dst_path)
                file_count = len(list(dst_path.rglob("*")))
                print(f"  ✓ {src_dir} ({file_count} 個文件)")
            else:
                print(f"  ✗ 找不到: {src_dir}")
        except Exception as e:
            print(f"  ✗ 複製失敗 {src_dir}: {e}")
    
    print("\n" + "=" * 50)
    print("複製完成！")
    print("=" * 50)
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n操作已取消")
        sys.exit(1)
    except Exception as e:
        print(f"\n錯誤: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
