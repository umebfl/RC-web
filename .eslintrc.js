module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        "comma-spacing": [          // 在逗号之前和之后强制执行一致的间距
            2,
            {
                "before": false,
                "after": true,
            },
        ],
        "indent": [                 // 缩进
            2,
            4,                      // 4个空格一个tab
            {"SwitchCase": 1},      // switch 缩进设置
        ],
        "linebreak-style": [        // 折行风格
            2,
            "unix",
        ],
        "valid-jsdoc": 2,           // 有效的文档格式
        "no-var": 2,                // 禁用var
        "quotes": [                 // 引号数量
            2,
            "single",
        ],
        "semi": [                   // 省略分号
            2,
            "never",
        ],
        "no-console": [             // 无console
            0,
        ],
        "no-unused-vars": [         // 未使用变量
            0,
        ],
        "no-const-assign": 2,       // 禁止修改 const 声明的变量
        "space-infix-ops": 2,       // 操作符周围有空格
        "curly": [                  // 单行作用域总是需要添加{} 比如 if (foo) foo++; => if (foo) { foo++; }
            2,
            "all",
        ],
        "comma-dangle": [           // 数组,()和{}最后 单行不加逗号, 多行总是需要添加逗号
            2,
            "always-multiline",
        ],
        "no-extra-boolean-cast": [  // !!转bool
            0,
        ],
        "no-case-declarations": 1,
        "linebreak-style": 0,       // 断行风格
        "no-trailing-spaces": 2,    // 不允许在语句后存在多余的空格
        "eqeqeq": 2,                // 消除不安全类型的全等操作
        "no-debugger": 1,           // debugger关键字
        "react/react-in-jsx-scope": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-tag-spacing": 0,
        "jsx-quotes": [                 // 引号数量
            2,
            "prefer-single",
        ],
        "react/jsx-indent": [                 // 缩进
            2,
            4,                      // 4个空格一个tab
        ],
    },
}
