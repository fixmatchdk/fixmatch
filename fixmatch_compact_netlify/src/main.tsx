
import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import '../styles.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const dicts:any = {
  da:{nav:{tasks:'Se opgaver',signup:'Tilmeld',login:'Login',home:'Hjem',categories:'Kategorier',terms:'Vilkår',about:'Om os',create:'Opret opgave'},banner:'Kun 5% i Servicegebyr resten af året, herefter 10%',heroTitle:'Få din opgave løst til den rette pris',heroSub:'Post din opgave, angiv budget, og få bud fra dygtige håndværkere tæt på dig.',why:'Hvorfor vælge Fixmatch?',whyItems:[{t:'Spar penge',s:'Direkte kontakt uden dyre mellemled. Spar op til 70%.'},{t:'Støt lokalt',s:'Hold pengene i nærområdet og støt lokale fagfolk.'},{t:'Tryghed',s:'Betal først når du er tilfreds. Sikker betaling og anmeldelser.'}],proTitle:'Din helt egen chef',proText:'Er du god med dine hænder? Vælg selv opgaver og arbejd når det passer dig.',proBullets:['Gratis adgang til tusindvis af opgaver','Ingen abonnement eller skjulte gebyrer','Få en ekstra indkomst når du har tid og lyst'],ctaPro:'Tilmeld dig som tilbyder',helpTitle:'Hvad skal du have hjælp til?'},
  en:{nav:{tasks:'See tasks',signup:'Sign up',login:'Log in',home:'Home',categories:'Categories',terms:'Terms',about:'About',create:'Post a task'},banner:'Only 5% service fee for the rest of the year, then 10%',heroTitle:'Get your job done at the right price',heroSub:'Post your task, set your budget, and get bids from local pros.',why:'Why choose Fixmatch?',whyItems:[{t:'Save money',s:'Direct contact. Save up to 70%.'},{t:'Support local',s:'Keep money in your community.'},{t:'Safety',s:'Pay only when happy. Secure payments.'}],proTitle:'Be your own boss',proText:'Pick the jobs you want, when you want.',proBullets:['Free access to thousands of tasks','No subscriptions or hidden fees','Earn extra when it suits you'],ctaPro:'Join as a pro',helpTitle:'What do you need help with?'}
}
const cats = [{slug:'maler', da:'Maler', en:'Painter', dd:'Professionelle maleropgaver.', ee:'Professional painting.'},{slug:'rengoering', da:'Rengøring', en:'Cleaning', dd:'Privat- og erhvervsrengøring.', ee:'Home & commercial cleaning.'},{slug:'traefaeldning', da:'Træfældning', en:'Tree felling', dd:'Sikker beskæring og fældning.', ee:'Safe pruning and felling.'}]
const tasks = [{id:'1',title:'Male stue',city:'København',zip:'2100',budget_min:1500,budget_max:3000,lat:55.6761,lng:12.5683,description:'Maling af 25 kvm stue, vægge + loft.'},{id:'2',title:'Havearbejde',city:'Aarhus',zip:'8000',budget_min:500,budget_max:1200,lat:56.1629,lng:10.2039,description:'Klippe hæk og fjerne affald.'},{id:'3',title:'Rengøring',city:'Aalborg',zip:'9000',budget_min:400,budget_max:700,lat:57.0488,lng:9.9217,description:'2 timers rengøring af lejlighed.'}]

function Header({lang,setLang}:{lang:'da'|'en',setLang:(l:'da'|'en')=>void}){
  const d=dicts[lang]
  return (<header className="header">
    <div className="banner"><div className="container"><div className="marq">{d.banner} • {d.banner}</div></div></div>
    <div className="container" style={{padding:'12px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Link to="/" style={{display:'flex',gap:8,alignItems:'center'}}><img src="/logo.svg" height={36}/><b>Fixmatch</b></Link>
      <nav className="nav">
        <Link to="/opgaver">{d.nav.tasks}</Link>
        <Link to="/tilmeld">{d.nav.signup}</Link>
        <Link to="/login">{d.nav.login}</Link>
        <img className="flag" src="/dk.svg" onClick={()=>setLang('da')}/>
        <img className="flag" src="/gb.svg" onClick={()=>setLang('en')}/>
      </nav>
    </div>
    <div style={{borderTop:'1px solid #eee'}}>
      <div className="container" style={{display:'flex',gap:16,overflowX:'auto',padding:'8px 0'}}>
        <Link className="btn primary" to="/opret">{d.nav.create}</Link>
        <Link to="/">{d.nav.home}</Link>
        <Link to="/kategorier">{d.nav.categories}</Link>
        <Link to="/vilkar">{d.nav.terms}</Link>
        <Link to="/om-os">{d.nav.about}</Link>
      </div>
    </div>
  </header>)
}

function Home({lang}:{lang:'da'|'en'}){
  const d=dicts[lang]
  return (<>
    <section className="hero">
      <div className="container grid grid-2" style={{alignItems:'center'}}>
        <div>
          <h1>{d.heroTitle}</h1>
          <p>{d.heroSub}</p>
          <div className="tags mt">
            <Link className="btn primary" to="/opret">{d.nav.create}</Link>
            <Link className="btn" to="/opgaver">{d.nav.tasks}</Link>
          </div>
        </div>
        <div className="card" style={{position:'relative'}}>
          <img src="https://picsum.photos/seed/fixmatch/600/320" style={{width:'100%',borderRadius:8}}/>
          <div className="badge" style={{position:'absolute',top:10,left:10}}>★★★★★ “Fantastisk oplevelse!”</div>
          <div className="badge" style={{position:'absolute',bottom:10,right:10}}>Betaling gennemført</div>
          <div className="badge" style={{position:'absolute',bottom:56,right:60}}>Opgave oprettet</div>
        </div>
      </div>
    </section>

    <section className="container mt">
      <h2 className="mb">{d.why}</h2>
      <div className="grid grid-3">
        {d.whyItems.map((x:any,i:number)=>(<div className="card" key={i}>
          <div style={{fontSize:28}}>{['💸','📍','🛡️'][i]}</div>
          <h3 style={{margin:'8px 0 4px 0'}}>{x.t}</h3>
          <div className="small">{x.s}</div>
        </div>))}
      </div>
    </section>

    <section className="container mt">
      <h3 className="mb">{d.helpTitle}</h3>
      <div className="grid grid-3">
        {cats.map(c=>(<Link className="card" key={c.slug} to={'/kategori/'+c.slug}><b>{lang==='da'?c.da:c.en}</b><div className="small">{lang==='da'?c.dd:c.ee}</div></Link>))}
      </div>
    </section>

    <section className="container mt grid grid-2">
      <div>
        <h3 className="mb">Live opgaver på kort</h3>
        <div className="map">
          <MapContainer center={[56.0,10.0]} zoom={6} style={{height:'100%',width:'100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors"/>
            {tasks.map(m=>(<Marker key={m.id} position={[m.lat,m.lng] as any}><Popup><b>{m.title}</b><div className="small">{m.city} {m.zip}</div></Popup></Marker>))}
          </MapContainer>
        </div>
      </div>
      <div>
        <h3 className="mb">Anmeldelser</h3>
        <div className="card review"><div className="stars">★★★★★</div> Hurtig og professionel maler. – Mads</div>
        <div className="card review mt"><div className="stars">★★★★★</div> Super rengøring – alt skinnede! – Sara</div>
        <div className="card review mt"><div className="stars">★★★★☆</div> God pris og flot arbejde i haven. – Ali</div>
      </div>
    </section>

    <section className="container mt grid grid-2" style={{alignItems:'center'}}>
      <div>
        <h3>{d.proTitle}</h3>
        <p>{d.proText}</p>
        <ul>{d.proBullets.map((b:string,i:number)=><li key={i}>{b}</li>)}</ul>
        <Link className="btn primary" to="/tilmeld">{d.ctaPro}</Link>
      </div>
      <img src="https://picsum.photos/seed/tools/600/320" style={{width:'100%',border:'1px solid #eee',borderRadius:12}}/>
    </section>
  </>)
}

function TasksPage(){
  return (<div className="container" style={{padding:'24px 0'}}>
    <h1>Opgaver</h1>
    <table className="table mt"><thead><tr><th>Titel</th><th>By/Postnr.</th><th>Budget</th></tr></thead>
      <tbody>{tasks.map(t=>(<tr key={t.id}><td><Link to={'/opgave/'+t.id}>{t.title}</Link></td><td>{t.city} {t.zip}</td><td>{t.budget_min}–{t.budget_max} DKK</td></tr>))}</tbody>
    </table>
  </div>)
}

function TaskDetail(){
  const {id}=useParams()
  const t = tasks.find(x=>x.id===id)
  if(!t) return <div className="container" style={{padding:'24px 0'}}>Opgave ikke fundet.</div>
  return (<div className="container" style={{padding:'24px 0'}}>
    <h1>{t.title}</h1><div className="small">{t.city} {t.zip}</div>
    <p className="mt">{t.description}</p>
    <div className="card mt"><b>Byd på opgaven</b>
      <div className="mt grid grid-2"><input placeholder="Beløb i DKK"/><input placeholder="Din besked"/></div>
      <button className="btn primary mt">Afgiv bud</button>
    </div>
  </div>)
}

function CreateTask(){
  const nav=useNavigate()
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState(''); const [mi,setMi]=useState(''); const [ma,setMa]=useState(''); const [city,setCity]=useState(''); const [zip,setZip]=useState('')
  return (<div className="container" style={{padding:'24px 0'}}>
    <h1>Opret opgave</h1>
    <div className="grid">
      <div><label>Titel</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
      <div><label>Beskrivelse</label><textarea rows={6} value={desc} onChange={e=>setDesc(e.target.value)} /></div>
      <div className="grid grid-2"><div><label>Budget min</label><input type="number" value={mi} onChange={e=>setMi(e.target.value)} /></div><div><label>Budget max</label><input type="number" value={ma} onChange={e=>setMa(e.target.value)} /></div></div>
      <div className="grid grid-2"><div><label>By</label><input value={city} onChange={e=>setCity(e.target.value)} /></div><div><label>Postnr.</label><input value={zip} onChange={e=>setZip(e.target.value)} /></div></div>
      <button className="btn primary" onClick={()=>nav('/opgaver')}>Gem opgave</button>
    </div>
  </div>)
}

const Categories=()=> (<div className="container" style={{padding:'24px 0'}}><h1>Kategorier</h1><div className="grid grid-3 mt">{cats.map(c=>(<Link className="card" key={c.slug} to={'/kategori/'+c.slug}><b>{c.da}</b><div className="small">{c.dd}</div></Link>))}</div></div>)
function CategoryPage(){
  const {slug}=useParams()
  const c = cats.find(x=>x.slug===slug)
  if(!c) return <div className="container" style={{padding:'24px 0'}}>Kategori ikke fundet.</div>
  return (<div className="container" style={{padding:'24px 0'}}>
    <div className="grid grid-2">
      <img src={`https://picsum.photos/seed/${slug}/600/360`} style={{width:'100%',border:'1px solid #eee',borderRadius:12}}/>
      <div><h1>{c.da}</h1><p>{c.dd}</p><Link className="btn primary" to="/opret">Opret en opgave og få et gratis bud</Link></div>
    </div>
  </div>)
}
const Terms=()=> <div className="container" style={{padding:'24px 0'}}><h1>Vilkår</h1><p>Standard vilkår (tilpas senere).</p></div>
const About=()=> <div className="container" style={{padding:'24px 0'}}><h1>Om os</h1><p>Fixmatch forbinder kunder og lokale håndværkere. Transparent budget og bud direkte på opgaven.</p></div>
const Login=()=> <div className="container" style={{padding:'24px 0'}}><h1>Login</h1><p>Supabase/Firebase kan kobles her.</p></div>
const Signup=()=> <div className="container" style={{padding:'24px 0'}}><h1>Tilmeld</h1><p>Supabase signup + e-mail verifikation.</p></div>
const VerifyPhone=()=> <div className="container" style={{padding:'24px 0'}}><h1>SMS Verificering</h1><p>Firebase Phone Auth + reCaptcha.</p></div>
const Profile=()=> <div className="container" style={{padding:'24px 0'}}><h1>Profil</h1><p>Redigér oplysninger.</p></div>
function Contact(){
  return (<div className="container" style={{padding:'24px 0'}}>
    <h1>Kontakt os</h1>
    <form name="contact" method="POST" data-netlify="true" className="grid" style={{maxWidth:520}}>
      <input type="hidden" name="form-name" value="contact" />
      <div><label>Navn</label><input name="name" required /></div>
      <div><label>E-mail</label><input name="email" type="email" required /></div>
      <div><label>Besked</label><textarea name="message" rows={6} required /></div>
      <button className="btn primary" type="submit">Send</button>
    </form>
  </div>)
}
function Footer(){
  return (<footer className="footer"><div className="container" style={{padding:'24px 0'}}>
    <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}>
      <div><div style={{display:'flex',gap:8,alignItems:'center'}}><img src="/logo.svg" height={28}/><b>Fixmatch</b></div><div className="small">Peer-to-peer platform for opgaver og håndværk.</div></div>
      <div><b>Sider</b><div className="grid"><Link to="/opret">Opret opgave</Link><Link to="/opgaver">Se opgaver</Link><Link to="/kategorier">Kategorier</Link><Link to="/vilkar">Vilkår</Link><Link to="/om-os">Om os</Link><Link to="/kontakt">Kontakt</Link></div></div>
      <div><b>Juridisk</b><div className="small">Funktioner er generiske; tekst, billeder og layout er unikke for Fixmatch.</div></div>
    </div>
    <div className="small" style={{textAlign:'center',marginTop:12}}>© {new Date().getFullYear()} Fixmatch.dk</div>
  </div></footer>)
}

function Layout({children,lang,setLang}:{children:any,lang:'da'|'en',setLang:(l:'da'|'en')=>void}){
  return <><Header lang={lang} setLang={setLang}/><main>{children}</main><Footer/></>
}

function App(){
  const [lang,setLang]=useState<'da'|'en'>('da')
  return (<BrowserRouter>
    <Layout lang={lang} setLang={setLang}>
      <Routes>
        <Route path="/" element={<Home lang={lang}/>} />
        <Route path="/opgaver" element={<TasksPage/>} />
        <Route path="/opgave/:id" element={<TaskDetail/>} />
        <Route path="/opret" element={<CreateTask/>} />
        <Route path="/kategorier" element={<Categories/>} />
        <Route path="/kategori/:slug" element={<CategoryPage/>} />
        <Route path="/vilkar" element={<Terms/>} />
        <Route path="/om-os" element={<About/>} />
        <Route path="/kontakt" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/tilmeld" element={<Signup/>} />
        <Route path="/verify-phone" element={<VerifyPhone/>} />
        <Route path="/profil" element={<Profile/>} />
      </Routes>
    </Layout>
  </BrowserRouter>)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App/>)
