const e=require("chalk"),s=require("webpack"),i=require("webpack-build-notifier"),t=require("webpack-bundle-analyzer").BundleAnalyzerPlugin,n=require("clean-webpack-plugin"),l=require("compression-webpack-plugin"),r=require("fork-ts-checker-webpack-plugin"),h=require("friendly-errors-webpack-plugin"),a=require("html-webpack-include-assets-plugin"),c=require("html-webpack-plugin"),o=require("lodash-webpack-plugin"),u=require("mini-css-extract-plugin"),p=require("progress-bar-webpack-plugin"),m=require("webpack-spritesmith"),d=require("stylelint-webpack-plugin"),g=require("uglifyjs-webpack-plugin"),{stylelintIgnores:f,stylelintRules:w}=require("./bruce"),{ACTION_TEXT:b}=require("../i18n"),{MAP:y,IS_TS:k,AbsPath:q,IsExist:j,ReadEntry:v}=require("../util");module.exports=class{constructor(n){const{analyze:c,compress:v,csslint:P,hash:A,jslint:E,mode:x,polyfill:C}=n;this.mode=x,this.isCsslint=P,this.isJslint=E,this.isPolyfill=C,this.isHash=A,this.isCompress=v,this.isAnalyze=c,this.define=new s.DefinePlugin({RUN_ENV:JSON.stringify(y[this.mode])}),this.progressBar=new p({clear:!1,format:`${e.yellowBright("build")} [${e.greenBright(":bar")}] ${e.blueBright(":percent")} ${e.redBright(":elapseds")}`,width:50}),this.spritesmith=j("src/assets/img/icon")?new m({apiOptions:{cssImageRef:"~sprite.png"},spritesmithOptions:{algorithm:"binary-tree"},src:{cwd:q("src/assets/img/icon"),glob:"*.png"},target:{css:q("src/assets/css/sprite.css"),image:q("src/assets/img/sprite.png")}}):null,this.stylelint=this.isCsslint||1!==this.mode?new d({cache:!0,cacheLocation:q("node_modules/.cache/stylelint-webpack-plugin/.stylelintcache"),configFile:q("../package.json",1),configOverrides:{ignoreFiles:f.map(e=>q(e)),rules:w},context:"src",fix:!1,syntax:"scss"}):null,0===this.mode?(this.defineDllEnv=new s.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("development")}),this.dll=new s.DllPlugin({name:"[name]",path:q("dist/static/[name]-manifest.json")}),this.uglifyjs=new g({cache:!0,parallel:!0})):1===this.mode?(this.dllReference=j("dist/static")?new s.DllReferencePlugin({manifest:require(q("dist/static/vendor-manifest.json"))}):null,this.hotModuleReplacement=new s.HotModuleReplacementPlugin,this.forkTsChecker=this.isJslint&&k?new r({reportFiles:["src/**/*.{ts,tsx}"],tsconfig:q("tsconfig.json"),tslint:j("tslint.json")?q("tslint.json"):q("../template/tslint.json",1)}):null,this.friendlyErrors=new h,this.htmlIncludeAssets=new a({append:!1,assets:["static/vendor.dll.js"]})):(this.buildNotifier=new i({suppressSuccess:!0,suppressWarning:!0,title:b.build}),this.bundleAnalyzer=this.isAnalyze?new t({analyzerPort:9090}):null,this.compression=this.isCompress?new l({test:/\.(css|js)$/,threshold:10240}):null,this.htmlIncludeAssets=this.isPolyfill?new a({append:!1,assets:["https://cdn.polyfill.io/v2/polyfill.min.js"],publicPath:!1}):null,this.lodash=new o,this.miniCssExtract=new u({filename:`css/[name].bundle${this.isHash?".[contenthash:4]":""}.css`}))}clean(e,...s){return new n([...s],{root:q(e),verbose:!1})}html(){const e=v("src");return e.map(s=>{const i={chunks:["manifest","vendor","index"],chunksSortMode:"manual",favicon:q("src/assets/img/favicon.ico"),filename:`${s}.html`,minify:1!==this.mode&&{collapseWhitespace:!0,removeComments:!0},template:q(`src${e.length>1?`/pages/${s}`:""}/index.html`)};return e.length>1&&Object.assign(i,{chunks:["manifest","vendor","common",s]}),new c(i)})}getPlugin(){let e=[];return(e=0===this.mode?[this.define,this.defineDllEnv,this.dll,this.progressBar,this.uglifyjs,this.clean("dist","static")]:1===this.mode?[this.define,this.dllReference,this.hotModuleReplacement,this.forkTsChecker,this.friendlyErrors,this.spritesmith,this.stylelint,...this.html(),this.htmlIncludeAssets]:[this.define,this.buildNotifier,this.bundleAnalyzer,this.compression,this.lodash,this.miniCssExtract,this.progressBar,this.spritesmith,this.stylelint,this.clean("dist",`${y[this.mode]}`),...this.html(),this.htmlIncludeAssets]).filter(e=>e)}};