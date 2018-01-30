// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Window = vscode.window;
const Range = vscode.Range;
const { Color } = require('./constants');
const beautify = require('js-beautify');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // text functions
    vscode.commands.registerCommand('extension.textFunctions', textFunctions);

    // color functions
    vscode.commands.registerCommand('extension.colorFunctions', colorFunctions);

    // markdown table snippet
    vscode.commands.registerTextEditorCommand('extension.tableFunctions', editor => {
        // enter snippet mode
        if (editor.selection.isEmpty) {
            // the Position object gives you the line and character where the cursor is
            const position = editor.selection.active;
            const tableSyntax = '\n| 一个普通标题 | 一个普通标题 |\n' + '| ------| ------ |\n' + '| 短文本 | 稍微长一点的文本 |\n';
            return editor.insertSnippet(
                new vscode.SnippetString(tableSyntax),
                position
            );
        }
    });

    // support emoji
    return {
        extendMarkdownIt(md) {
            return md.use(require('markdown-it-emoji'));
        }
    }
}

/**
 * text void
 */
function textFunctions() {
    if (!vscode.window.activeTextEditor) {
		vscode.window.showInformationMessage('Open a file first to manipulate text selections');
		return;
	}      
	
    var items = [];

    items.push({ label: "toImg", description: "转化为图片" });
    items.push({ label: "toLink", description: "转化为链接" });
    items.push({ label: "toBigTitle", description: "大标题" });
    items.push({ label: "toMidTitle", description: "中标题" });
    items.push({ label: "toBold", description: "加粗" });
    items.push({ label: "toHightlight", description: "代码高亮" });

    Window.showQuickPick(items).then((selection) => {
		if (!selection) {
			return;
		}
		let e = Window.activeTextEditor;
		let d = e.document;
        let sel = e.selections;
        
        switch (selection.label) {
            case "toBigTitle":
                toBigTitle(e, d, sel);
                break;
            case "toMidTitle":
                toMidTitle(e, d, sel);
                break;
            case "toBold":
                toBold(e, d, sel);
                break;
            case "toImg":
                toImg(e, d, sel);
                break;
            case "toLink":
                toLink(e, d, sel);
                break;
            case "toHightlight":
                toHightlight(e, d, sel);
                break;
            default:
				console.log("hum this should not have happend - no selection")
				break;
        }
    })
}

/**
 * colors void
 */
function colorFunctions() {
	
	if (!vscode.window.activeTextEditor) {
		vscode.window.showInformationMessage('Open a file first to manipulate text selections');
		return;
	}      
	
    var items = [];

    items.push({ label: "toRed", description: "红色" });
    items.push({ label: "toPink", description: "粉色" });
    items.push({ label: "toYellow", description: "黄色" });
    items.push({ label: "toOrange", description: "橙色" });
    items.push({ label: "toCoffee", description: "棕色" });
    items.push({ label: "toPurple", description: "紫色" });
    items.push({ label: "toBlue", description: "蓝色" });
    items.push({ label: "toGreen", description: "绿色" });
    items.push({ label: "toBlack", description: "黑色" });
    items.push({ label: "toGray", description: "灰色" });
    items.push({ label: "toWhite", description: "白色" });

    Window.showQuickPick(items).then((selection) => {
		if (!selection) {
			return;
		}
		let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;

		switch (selection.label) {
            case "toRed":
                toRed(e, d, sel);
                break;
            case "toPink":
                toPink(e, d, sel);
                break;
            case "toYellow":
                toYellow(e, d, sel);
                break;
            case "toOrange":
                toOrange(e, d, sel);
                break;
            case "toCoffee":
                toCoffee(e, d, sel);
                break;
            case "toPurple":
                toPurple(e, d, sel);
                break;
            case "toBlue":
                toBlue(e, d, sel);
                break;
            case "toGreen":
                toGreen(e, d, sel);
                break;
            case "toBlack":
                toBlack(e, d, sel);
                break;
            case "toGray":
                toGray(e, d, sel);
                break;
            case "toWhite":
                toWhite(e, d, sel);
                break;
            default:
				console.log("hum this should not have happend - no selection")
				break;
		}
	});
}

function toImg (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '![](' + txtStart + ')');
	});
}

function toLink (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '[' + txtStart + '](http://)');
	});
}

function toBigTitle (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        if (!e.selection.isEmpty) {
            let tmp = sel[0].start.character === 0 ? '## ' : '\n## ';
            edit.replace(sel[0], tmp + txtStart + '\n');
        }
	});
}

function toMidTitle (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        if (!e.selection.isEmpty) {
            let tmp = sel[0].start.character === 0 ? '#### ' : '\n#### ';
            edit.replace(sel[0], tmp + txtStart + '\n');
        }
	});
}

function toBold (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '**' + txtStart + '**');
	});
}

function toRed (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.red +'>' + txtStart + '</font>');
	});
}

function toPink (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.pink +'>' + txtStart + '</font>');
	});
}

function toYellow (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.yellow +'>' + txtStart + '</font>');
	});
}

function toOrange (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.orange +'>' + txtStart + '</font>');
	});
}

function toCoffee (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.coffee +'>' + txtStart + '</font>');
	});
}

function toPurple (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.purple +'>' + txtStart + '</font>');
	});
}

function toBlue (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.blue +'>' + txtStart + '</font>');
	});
}

function toGreen (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.green +'>' + txtStart + '</font>');
	});
}

function toBlack (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.black +'>' + txtStart + '</font>');
	});
}

function toGray (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.gray +'>' + txtStart + '</font>');
	});
}

function toWhite (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '<font color='+ Color.white +'>' + txtStart + '</font>');
	});
}

function toHightlight (e, d, sel) {
    e.edit(function (edit) {
        let txtStart = d.getText(new Range(sel[0].start, sel[0].end));
        edit.replace(sel[0], '``` js \n' + beautify(txtStart, { space_in_empty_paren: true }) + '\n```');
	});
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;