<template>
    <div class="json-format">
        <codemirror
            ref="myCm"
            :value="json"
            :options="cmOptions"
            class="code"
        ></codemirror>
        <el-button type="primary" @click="format">格式化</el-button>
        <label>缩进</label>
        <el-select v-model="options.indent" placeholder="请选择">
            <el-option :value="2"></el-option>
            <el-option :value="4"></el-option>
            <el-option :value="8"></el-option>
        </el-select>
        <el-button @click="compress">压缩</el-button>
        <el-button @click="escape">转义</el-button>
        <el-button @click="removeEscape">去除转义</el-button>
    </div>
</template>
<script>
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/idea.css'
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/mode/javascript/javascript'

    export default {
        name: 'jsonFormat',
        components: { codemirror },
        data() {
            return {
                json: '',
                options: {indent: 2},
                output: '',
                colours: '',
                cmOptions: {
                    mode: 'javascript',
                    indentUnit: 2,
                    lineNumbers: true
                }
            }
        },
        computed: {
            codemirror() {
                return this.$refs.myCm.codemirror
            }
        },
        methods: {
            compress(){
                let json = this.codemirror.getValue()
                this.json = json.replace(/[\s\t\r\n]/g, '')
            },
            escape(){
                let json = this.codemirror.getValue()
                this.json = json.replace(/"/g, '\\"')
            },
            removeEscape(){
                let json = this.codemirror.getValue()
                this.json = json.replace(/\\"/g, '"')
            },
            format() {
                let json = this.codemirror.getValue()
                if (!json) {
                    this.$message.warning('请输入json')
                    return
                }
                try {
                    this.json = this.formatJson(json, this.options)
                    this.codemirror.setValue(this.json)
                } catch (error) {
                    this.$message.error('json格式不正确')
                    console.error(error)
                }
            },
            formatJson(json, options) {
                options = options || {}
                var reg = null,
                    formatted = '',
                    pad = 0,
                    PADDING = ' '.repeat(options.indent || 2)
//                options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false
//                options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true
                if (typeof json !== 'string') {
                    json = JSON.stringify(json)
                } else {
                    json = JSON.parse(json)
                    json = JSON.stringify(json)
                }
                reg = /([\{\}])/g
                json = json.replace(reg, '\r\n$1\r\n')
                reg = /([\[\]])/g
                json = json.replace(reg, '\r\n$1\r\n')
                reg = /(\,)/g
                json = json.replace(reg, '$1\r\n')
                reg = /(\r\n\r\n)/g
                json = json.replace(reg, '\r\n')
                reg = /\r\n\,/g
                json = json.replace(reg, ',')
                if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
                    reg = /\:\r\n\{/g
                    json = json.replace(reg, ':{')
                    reg = /\:\r\n\[/g
                    json = json.replace(reg, ':[')
                }
                if (options.spaceAfterColon) {
                    reg = /\:/g
                    json = json.replace(reg, ':')
                }
                (json.split('\r\n')).forEach(function(node, index) {
                    //console.log(node);
                    var i = 0,
                        indent = 0,
                        padding = ''

                    if (node.match(/\{$/) || node.match(/\[$/)) {
                        indent = 1
                    } else if (node.match(/\}/) || node.match(/\]/)) {
                        if (pad !== 0) {
                            pad -= 1
                        }
                    } else {
                        indent = 0
                    }

                    for (i = 0; i < pad; i++) {
                        padding += PADDING
                    }

                    formatted += padding + node + '\r\n'
                    pad += indent
                })
                 return formatted.trim()
            },
            //引用示例部分
            //(1)创建json格式或者从后台拿到对应的json格式
            //var originalJson = {"name": "binginsist", "sex": "男", "age": "25"};
            //下面用一个真实的json数据做测试
            /*
            var originalJson = {
                "_errmsg":"ok",
                "result":[
                ],
                "stat":"wechat",
                "_token":"",
                "weixinId":"900504",
                "_errcode":"0",
                "regionId":"00000000"
            }
            */
            //(2)调用formatJson函数,将json格式进行格式化
            // var resultJson = formatJson(originalJson);
            //(3)将格式化好后的json写入页面中
            //document.getElementById("writePlace").innerHTML = '<pre>' +resultJson + '<pre/>';

//            //着色
//            //window.TAB = "    ";
//            IsArray(obj) {
//                return obj &&
//                    typeof obj === 'object' && typeof obj.length === 'number' && !(obj.propertyIsEnumerable('length'))
//            }
//            , Process() {
//                var json = this.json
//                console.log(json)
//                document.getElementById('Canvas').style.display = 'block'
//                var html = ''
//                try {
//                    if (json == '') {
//                        json = '""'
//                    }
//                    var obj = eval('[' + json + ']')
//                    html = this.ProcessObject(obj[0], 0, false, false, false)
//                    document.getElementById('Canvas').innerHTML = '<PRE class=\'CodeContainer\'>' + html + '</PRE>'
//                } catch (e) {
//                    alert('json语法错误，不能格式化。错误信息:\n' + e.message)
//                    document.getElementById('Canvas').innerHTML = ''
//                }
//            }
//            , ProcessObject(obj, indent, addComma, isArray, isPropertyContent) {
//                var html = ''
//                var comma = (addComma) ? '<span class=\'Comma\'>,</span> ' : ''
//                var type = typeof obj
//                if (this.IsArray(obj)) {
//                    if (obj.length == 0) {
//                        html += this.GetRow(indent, '<span class=\'ArrayBrace\'>[ ]</span>' + comma, isPropertyContent)
//                    } else {
//                        html += this.GetRow(indent, '<span class=\'ArrayBrace\'>[</span>', isPropertyContent)
//                        for (var i = 0; i < obj.length; i++) {
//                            html += this.ProcessObject(obj[i], indent + 1, i < (obj.length - 1), true, false)
//                        }
//                        html += this.GetRow(indent, '<span class=\'ArrayBrace\'>]</span>' + comma)
//                    }
//                } else {
//                    if (type == 'object' && obj == null) {
//                        html += this.FormatLiteral('null', '', comma, indent, isArray, 'Null')
//                    } else {
//                        if (type == 'object') {
//                            var numProps = 0
//                            for (var prop in obj) {
//                                numProps++
//                            }
//                            if (numProps == 0) {
//                                html += this.GetRow(indent, '<span class=\'ObjectBrace\'>{ }</span>' + comma, isPropertyContent)
//                            } else {
//                                html += this.GetRow(indent, '<span class=\'ObjectBrace\'>{</span>', isPropertyContent)
//                                var j = 0
//                                for (var prop in obj) {
//                                    html += this.GetRow(indent + 1, '<span class="PropertyName">"' + prop + '"</span>: ' + this.ProcessObject(obj[prop], indent + 1, ++j < numProps, false, true))
//                                }
//                                html += this.GetRow(indent, '<span class=\'ObjectBrace\'>}</span>' + comma)
//                            }
//                        } else {
//                            if (type == 'number') {
//                                html += this.FormatLiteral(obj, '', comma, indent, isArray, 'Number')
//                            } else {
//                                if (type == 'boolean') {
//                                    html += this.FormatLiteral(obj, '', comma, indent, isArray, 'Boolean')
//                                } else {
//                                    if (type == ',') {
//                                        obj = Format, (indent, obj)
//                                        html += this.FormatLiteral(obj, '', comma, indent, isArray, ',')
//                                    } else {
//                                        if (type == 'undefined') {
//                                            html += this.FormatLiteral('undefined', '', comma, indent, isArray, 'Null')
//                                        } else {
//                                            html += this.FormatLiteral(obj, '"', comma, indent, isArray, 'String')
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//                return html
//            }
//
//            ,
//            FormatLiteral(literal, quote, comma, indent, isArray, style) {
//                if (typeof literal == 'string') {
//                    literal = literal.split('<').join('&lt;').split('>').join('&gt;')
//                }
//                var str = '<span class=\'' + style + '\'>' + quote + literal + quote + comma + '</span>'
//                if (isArray) {
//                    str = this.GetRow(indent, str)
//                }
//                return str
//            }
//            ,
//            Format(indent, obj) {
//                var tabs = ''
//                for (var i = 0; i < indent; i++) {
//                    tabs += window.TAB
//                }
//                var funcStrArray = obj.toString().split('\n')
//                var str = ''
//                for (var i = 0; i < funcStrArray.length; i++) {
//                    str += ((i == 0) ? '' : tabs) + funcStrArray[i] + '\n'
//                }
//                return str
//            }
//            ,
//            GetRow(indent, data, isPropertyContent) {
//                var tabs = ''
//                for (var i = 0; i < indent && !isPropertyContent; i++) {
//                    tabs += window.TAB
//                }
//                if (data != null && data.length > 0 && data.charAt(data.length - 1) != '\n') {
//                    data = data + '\n'
//                }
//                return tabs + data
//            }


        },
        created() {
        }
        ,
        mounted() {
        },
        watch: {
            json(newVal){
                this.codemirror.setValue(newVal)
            }
        }
    }
</script>
<style>
    .json-format .CodeMirror {
        height: 400px;

    }
    .json-format .code {
        margin-bottom: 15px;
    }
    .json-format .el-select {
        width: 70px;
    }

    .json-format .el-button + .el-button {
        margin-left: 0;
    }

    .json-format .el-button--primary {
        width: 100px;
        margin-left: 30px;
    }
</style>
