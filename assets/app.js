/* CVNSS4.0–Ternary Bridge interactive research demo | MIT | Long Ngo */
(() => {
  "use strict";
  const ABC = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const CORE = " abcdefghijklmnopqrstuvwxyz";
  const langTexts = {
    vi: {
      navPaper:"Bài báo",navProof:"Chứng minh",navLab:"Phòng thí nghiệm",navArchitecture:"Kiến trúc",navReferences:"Tài liệu",
      labHeading:"Phòng thí nghiệm: kiểm chứng bằng mã thực thi",labIntro:"Mã hóa theo song ánh 27 ↔ 3-trit, giải mã ngược, đo chi phí đóng gói và phát hiện giới hạn của CVNSS4.0.",
      labelInput:"Văn bản đầu vào",labelSource:"Hệ chữ đầu vào",labelTransport:"Chế độ khôi phục",labelTernary:"Biểu diễn tam phân",optCQN:"Chữ Quốc ngữ (CVNSS converter)",optCVSS:"Đã là 27 ký hiệu CVNSS",optStrict:"T27-Core (27 ký hiệu nghiêm ngặt)",optExtended:"T27-Extended (UTF-8 fallback thử nghiệm)",optBalanced:"Cân bằng (−1/0/+1)",optUnbalanced:"Không cân bằng (0/1/2)",
      run:"Mã hóa và chứng minh",tests:"Chạy kiểm thử",download:"Tải bảng ánh xạ CSV",copy:"Sao chép trit",unicode:"Nguồn / Unicode",cvss:"Chuyển đổi CVNSS4.0",trit:"Chuỗi trit",packed:"Dữ liệu đóng gói Base27 (HEX)",round:"Giải mã ngược và đối chiếu",mapping:"Bảng song ánh đầy đủ",mappingCol1:"Ký hiệu",mappingCol2:"Chỉ số",mappingCol3:"0,1,2",mappingCol4:"−1,0,+1",analysis:"Phân tích dung lượng",results:"Phép kiểm thử",
      valid:"PASS: T27-Core được giải mã nguyên vẹn. Kết quả này không chứng minh CQN → CVNSS là một-một.",
      invalid:"Không hợp lệ cho T27-Core: có ký tự ngoài bảng 27 (ví dụ chữ hoa, chữ số, dấu câu). Chọn Extended hoặc sửa dữ liệu; không tự động làm mất chữ.",
      extended:"T27-Extended thử nghiệm: bảo toàn UTF-8 của nguồn, không khẳng định mọi ký tự chỉ chiếm 3 trit. Đây là minh họa, chưa phải giao thức chuẩn hóa.",
      warning:"Chuyển đổi CQN → CVNSS có thể nhập nhằng. Bộ converter chọn cách giải mã canonical; kết quả Unicode ngược không được mặc định là byte-exact.",
      selftest:"Bộ chuyển đổi đính kèm",statTitle:"So sánh bit/ký hiệu trong T27-Core (lý thuyết và đóng gói)",statusPass:"ĐẠT",statusFail:"LỖI",clipboard:"Đã sao chép",codeTooLong:"Đầu vào quá dài để hiển thị đầy đủ. Chỉ hiển thị 240 trit đầu tiên.",
      error:"Lỗi",pack:"Đóng gói",total:"Tổng số ký hiệu",verifyExact:"Byte-exact Unicode",verifyCore:"Round-trip 27 ký hiệu",notClaim:"Chỉ số này đo payload T27-Core; không phải tỷ lệ nén toàn bộ văn bản Unicode."
    },
    ru: {
      navPaper:"Статья",navProof:"Доказательство",navLab:"Лаборатория",navArchitecture:"Архитектура",navReferences:"Литература",
      labHeading:"Лаборатория: проверяемое кодирование",labIntro:"Биекция 27 ↔ 3 трита, обратное декодирование, измерение упаковки и ограничения CVNSS4.0.",
      labelInput:"Входной текст",labelSource:"Исходная письменность",labelTransport:"Режим восстановления",labelTernary:"Троичное представление",optCQN:"Вьетнамский Unicode (конвертер CVNSS)",optCVSS:"Готовые 27 символов CVNSS",optStrict:"T27-Core (строго 27 символов)",optExtended:"T27-Extended (экспериментальный UTF-8 fallback)",optBalanced:"Сбалансированное (−1/0/+1)",optUnbalanced:"Несбалансированное (0/1/2)",
      run:"Кодировать и доказать",tests:"Запустить тесты",download:"Скачать таблицу CSV",copy:"Копировать триты",unicode:"Источник / Unicode",cvss:"Преобразование CVNSS4.0",trit:"Последовательность тритов",packed:"Упакованные данные Base27 (HEX)",round:"Обратное декодирование и проверка",mapping:"Полная таблица биекции",mappingCol1:"Символ",mappingCol2:"Индекс",mappingCol3:"0,1,2",mappingCol4:"−1,0,+1",analysis:"Анализ объёма",results:"Результаты тестирования",
      valid:"PASS: T27-Core восстановлен точно. Это не доказывает взаимно-однозначность CQN → CVNSS.",
      invalid:"Неверный ввод для T27-Core: символы вне алфавита из 27 знаков (например, прописные буквы, цифры, пунктуация). Выберите Extended или исправьте ввод.",
      extended:"Экспериментальный T27-Extended сохраняет исходные байты UTF-8; не каждый символ занимает 3 трита. Демонстрация, а не стандартизованный протокол.",
      warning:"Преобразование CQN → CVNSS допускает неоднозначности. Конвертер использует канонический вариант; точное восстановление исходных байтов не гарантировано.",
      selftest:"Прилагаемый конвертер",statTitle:"Бит на символ T27-Core: теоретическая и практическая упаковка",statusPass:"ПРОЙДЕНО",statusFail:"ОШИБКА",clipboard:"Скопировано",codeTooLong:"Длинный ввод: показаны только первые 240 тритов.",
      error:"Ошибка",pack:"Упаковка",total:"Число символов",verifyExact:"Точные байты Unicode",verifyCore:"Обратимость 27 символов",notClaim:"Измеряется только T27-Core payload; это не коэффициент сжатия произвольного Unicode."
    }
  };
  let locale="vi", lastTrits="";
  const $=id=>document.getElementById(id);
  const t=k=>langTexts[locale][k]||k;
  const tritArr=(i,balanced)=>{const a=[Math.floor(i/9),Math.floor(i/3)%3,i%3];return balanced?a.map(x=>x-1):a;};
  const tritFmt=a=>a.map(x=>x===-1?"−":x===1?"+":x===0?"0":"2").join("");
  const decodeTrits=(a,balanced)=>{const u=balanced?a.map(x=>x+1):a;const i=u[0]*9+u[1]*3+u[2];if(!Number.isInteger(i)||i<0||i>26)throw Error("Invalid trit");return CORE[i];};
  function validateCore(s){return /^[ a-z]*$/.test(s)}
  function encodeCore(s,balanced){if(!validateCore(s))throw Error("Outside T27-Core");return Array.from(s,c=>tritArr(CORE.indexOf(c),balanced));}
  function decodeCore(data,balanced){return data.map(x=>decodeTrits(x,balanced)).join("");}
  function packCore(str){
    if(!validateCore(str))throw Error("Invalid Core alphabet");
    const blocks=[],bytes=[]; for(let p=0;p<str.length;p+=10){
      const s=str.slice(p,p+10);let v=0n;for(const c of s)v=v*27n+BigInt(CORE.indexOf(c));
      const width=Math.ceil(s.length*Math.log2(27)/8),buf=Array(width).fill(0);
      for(let i=width-1;i>=0;i--){buf[i]=Number(v&255n);v>>=8n;}
      blocks.push({n:s.length,width,buf});bytes.push(...buf);
    }
    return {blocks,bytes,hex:bytes.map(b=>b.toString(16).padStart(2,"0")).join(" ").toUpperCase()};
  }
  function unpackCore(blocks){
    return blocks.map(b=>{let v=0n;for(const byte of b.buf)v=v*256n+BigInt(byte);
      const s=Array(b.n).fill(" ");for(let i=b.n-1;i>=0;i--){s[i]=CORE[Number(v%27n)];v/=27n;}if(v!==0n)throw Error("Overflow");return s.join("");
    }).join("");
  }
  function unicodeHex(s){return Array.from(new TextEncoder().encode(s),x=>x.toString(16).padStart(2,"0")).join(" ").toUpperCase();}
  const short=s=>s.length>380?s.slice(0,380)+" …":s;
  function setLocale(value){
    locale=value==="ru"?"ru":"vi";document.documentElement.lang=locale;
    document.querySelectorAll(".lang-panel").forEach(n=>n.hidden=n.dataset.lang!==locale);
    document.querySelectorAll("[data-lang-switch]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.langSwitch===locale)));
    document.querySelectorAll("[data-i18n]").forEach(n=>n.textContent=t(n.dataset.i18n));
    document.querySelectorAll("[data-i18n-option]").forEach(n=>n.textContent=t(n.dataset.i18nOption));
    document.querySelectorAll("[data-nav-target]").forEach(n=>n.setAttribute("href","#"+locale+"-"+n.dataset.navTarget));
    document.title=(locale==="vi"?"CVNSS4.0–Base27–3 Trit | Bản thảo nghiên cứu":"CVNSS4.0–Base27–3 трита | Препринт")+" · Long Ngo";
    try{localStorage.setItem("t27-lang",locale)}catch(_){}
    renderMapping();renderBars();runDemo(false);
  }
  function renderMapping(){
    const body=$("map-body");if(!body)return;body.textContent="";
    for(let i=0;i<27;i++){const tr=document.createElement("tr"),fields=[i===0?"SPACE":CORE[i].toUpperCase(),String(i),tritArr(i,false).join(""),tritFmt(tritArr(i,true))];
      fields.forEach(f=>{const td=document.createElement("td");td.textContent=f;tr.appendChild(td)});body.appendChild(tr);
    }
  }
  function renderBars(){
    const values=[["ASCII (8 bit)",8],["3 × 2 bit",6],["5-bit fixed",5],["Base27 / 10",4.8],["log₂27",Math.log2(27)]];
    const out=$("bars");if(!out)return;out.textContent="";
    values.forEach(([name,bits])=>{const row=document.createElement("div");row.className="bar-row";
      const label=document.createElement("span");label.textContent=name;
      const bar=document.createElement("div");bar.className="bar";const fill=document.createElement("div");fill.className="bar-fill";fill.style.width=bits/8*100+"%";bar.appendChild(fill);
      const val=document.createElement("b");val.textContent=bits.toFixed(3);row.append(label,bar,val);out.appendChild(row);
    });
  }
  function result(s,kind){$("result-status").className="result-band "+(kind||"");$("result-status").textContent=s;}
  function runDemo(scroll){
    const input=$("input-text").value,source=$("source-mode").value,transport=$("transport-mode").value,balanced=$("ternary-mode").value==="balanced";
    let cvss=input,sourceUnicode=input;
    try{
      if(source==="cqn"){if(typeof window.CVNSSConverter?.convert!=="function")throw Error("Converter JS missing");
        cvss=window.CVNSSConverter.convert(input,"cqn").cvss;
      }
      $("out-unicode").textContent=short(input)||"∅";$("out-cvss").textContent=short(cvss)||"∅";
      if(!validateCore(cvss)){
        if(transport==="core"){
          $("out-trit").textContent="—";$("out-packed").textContent="—";$("out-round").textContent="—";
          result(t("invalid")+" "+(source==="cqn"?t("warning"):""),"error");return;
        }
        const bytes=new TextEncoder().encode(sourceUnicode),reconstructed=new TextDecoder("utf-8",{fatal:true}).decode(bytes);
        lastTrits="";$("out-trit").textContent="EXTENDED • UTF-8 (not 3 trits/character)";
        $("out-packed").textContent=short(unicodeHex(input))+"\n"+bytes.length+" UTF-8 bytes";
        $("out-round").textContent=short(reconstructed)+"\n"+(reconstructed===input?"PASS: byte-preserving UTF-8":"ERROR");
        result(t("extended")+" "+t("warning"),"good");return;
      }
      const groups=encodeCore(cvss,balanced),decoded=decodeCore(groups,balanced),packed=packCore(cvss),unpacked=unpackCore(packed.blocks);
      lastTrits=groups.map(tritFmt).join(" ");const preview=groups.slice(0,80).map(tritFmt).join(" ");
      $("out-trit").textContent=preview+(groups.length>80?" …":"");
      $("out-packed").textContent=short(packed.hex)+"\n"+cvss.length+" symbols / "+packed.bytes.length+" packed bytes (payload only)";
      $("out-round").textContent=short(decoded)+"\n"+((decoded===cvss&&unpacked===cvss)?"PASS: exact T27 round-trip":"FAIL");
      result(t("valid")+(source==="cqn"?" "+t("warning"):""),"good");
    }catch(err){result(t("error")+": "+err.message,"error")}
    if(scroll)$("lab-heading").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function testSuite(){
    let cases=0,failures=[],ids=new Set(),balancedIds=new Set();
    function check(label,condition){cases++;if(!condition)failures.push(label);}
    const core=Array.from(CORE);
    for(let i=0;i<27;i++){
      const u=tritArr(i,false),b=tritArr(i,true);ids.add(u.join(""));balancedIds.add(b.join(","));
      check("mapping "+i,decodeTrits(u,false)===core[i]&&decodeTrits(b,true)===core[i]);
    }
    check("27 unique unsigned",ids.size===27);
    check("27 unique balanced",balancedIds.size===27);
    check("all 27 full coverage",decodeCore(encodeCore(CORE,false),false)===CORE);
    for(const s of [""," ","hello world","a","zzzzzzzzzz","abc xyz","theory","cvnss","  z  ","long ngo","a".repeat(101)]){
      check("roundtrip "+s,decodeCore(encodeCore(s,false),false)===s);
      check("balanced "+s,decodeCore(encodeCore(s,true),true)===s);
      check("pack "+s,unpackCore(packCore(s).blocks)===s);
    }
    let converterInfo="";
    if(window.CVNSSConverter){
      const audit=window.CVNSSConverter.audit(),self=window.CVNSSConverter.selfTest();
      check("converter selfTest()",self.ok);check("56 ambiguity groups",audit.ambiguityGroups===56);check("5 critical collision groups",audit.criticalCollisionGroups===5);
      converterInfo="CVNSS v"+audit.version+" · "+audit.ambiguityGroups+" ambiguous groups · "+self.tests+" converter self-tests";
    }else check("converter attached",false);
    const list=$("tests-output");list.textContent="";
    const lines=[String(cases-failures.length)+"/"+cases+" PASS",converterInfo,failures.length?failures.join(" | "):"27 mappings + both round-trips + block packing"];
    lines.forEach((line,i)=>{if(!line)return;const el=document.createElement("div");el.className="test-item "+(failures.length&&i===0?"fail":"pass");el.textContent=line;list.appendChild(el);});
    $("test-result").textContent=failures.length?t("statusFail")+" — "+failures.length:t("statusPass")+" — "+cases+"/"+cases;
    $("test-result").className="result-band "+(failures.length?"error":"good");
  }
  function downloadMap(){
    const rows=[["Symbol","Index","Unsigned_3trits","Balanced_3trits"],...Array.from({length:27},(_,i)=>[i?"\""+CORE[i].toUpperCase()+"\"":"SPACE",i,tritArr(i,false).join(""),tritFmt(tritArr(i,true))])];
    const data="\uFEFF"+rows.map(r=>r.join(",")).join("\r\n"),url=URL.createObjectURL(new Blob([data],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download="T27_bijection_27_symbols.csv";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  document.querySelectorAll("[data-lang-switch]").forEach(b=>b.addEventListener("click",()=>setLocale(b.dataset.langSwitch)));
  $("encode-btn")?.addEventListener("click",()=>runDemo(false));
  $("run-tests")?.addEventListener("click",testSuite);
  $("download-map")?.addEventListener("click",downloadMap);
  $("copy-trits")?.addEventListener("click",()=>navigator.clipboard?.writeText(lastTrits).then(()=>result(t("clipboard"),"good")).catch(()=>{}));
  $("print-page")?.addEventListener("click",()=>window.print());
  ["source-mode","transport-mode","ternary-mode"].forEach(id=>$(id)?.addEventListener("change",()=>runDemo(false)));
  window.addEventListener("scroll",()=>{const range=document.documentElement.scrollHeight-innerHeight;$("reading-progress").style.width=(range>0?scrollY/range*100:0)+"%"},{passive:true});
  let saved;try{saved=localStorage.getItem("t27-lang")}catch(_){}setLocale(saved==="ru"?"ru":"vi");testSuite();
})();
