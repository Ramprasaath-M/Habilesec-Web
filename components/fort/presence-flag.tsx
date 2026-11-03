export function PresenceFlag({country}:{country:string}) {
  return <svg viewBox="0 0 30 20" width="24" height="16" aria-hidden="true">
    {country==='IN'?<><path fill="#ff9933" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#138808" d="M0 13h30v7H0z"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".55"/>{Array.from({length:12},(_,i)=><path key={i} d="M15 7.4v5.2" stroke="#000080" strokeWidth=".2" transform={`rotate(${i*15} 15 10)`}/>)}</>:null}
    {country==='CA'?<><path fill="#fff" d="M0 0h30v20H0z"/><path fill="#d62027" d="M0 0h7v20H0zM23 0h7v20h-7zM15 3l1.3 3.5 2-1-1 3 3-1-1 2.5 2 1-4.7 3 .4 1.5-1.6-.3v3h-1v-3l-1.6.3.4-1.5-4.7-3 2-1-1-2.5 3 1-1-3 2 1z"/></>:null}
    {country==='US'?<><path fill="#fff" d="M0 0h30v20H0z"/>{Array.from({length:7},(_,i)=><rect key={i} y={i*40/13} width="30" height={20/13} fill="#b22234"/>)}<path fill="#3c3b6e" d="M0 0h13v10.8H0z"/>{Array.from({length:25},(_,i)=><circle key={i} cx={1.5+(i%5)*2.5} cy={1.2+Math.floor(i/5)*2.1} r=".45" fill="#fff"/>)}</>:null}
    {country==='HK'?<><path fill="#de2910" d="M0 0h30v20H0z"/>{Array.from({length:5},(_,i)=><path key={i} d="M15 10c-4-1-3-6 0-6 3 2-1 3 0 6Z" fill="#fff" transform={`rotate(${i*72} 15 10)`}/>)}</>:null}
    {country==='AE'?<><path fill="#00732f" d="M0 0h30v7H0z"/><path fill="#fff" d="M0 7h30v6H0z"/><path fill="#000" d="M0 13h30v7H0z"/><path fill="#f00" d="M0 0h8v20H0z"/></>:null}
  </svg>;
}
