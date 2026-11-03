// Locations and HQ contact verified against HabileSec's contact page and the
// read-only Habilesec EX content.js. Coordinates describe regions, not offices.
export const presenceLocations=[
  {id:'kumbakonam',label:'Kumbakonam',title:'Kumbakonam, India',region:'India',flag:'IN',lat:10.96,lon:79.39,marker:[588,286],description:"HabileSec's headquarters in Kumbakonam, Tamil Nadu.",hq:true},
  {id:'bengaluru',label:'Bengaluru',title:'Bengaluru, India',region:'India',flag:'IN',lat:12.97,lon:77.59,marker:[523,266],description:'Engineering presence in Bengaluru, India. Connect with our headquarters team for enquiries.',hq:false},
  {id:'ahmedabad',label:'Ahmedabad',title:'Ahmedabad, India',region:'India',flag:'IN',lat:23.02,lon:72.57,marker:[495,214],description:'Advisory presence in Ahmedabad, India. Connect with our headquarters team for enquiries.',hq:false},
  {id:'bhilwara',label:'Bhilwara',title:'Bhilwara, India',region:'India',flag:'IN',lat:25.35,lon:74.64,marker:[568,151],description:'Delivery presence in Bhilwara, India. Connect with our headquarters team for enquiries.',hq:false},
  {id:'canada',label:'Canada',title:'Canada',region:'North America',flag:'CA',lat:56,lon:-106,marker:[188,89],description:'Connect with HabileSec’s North American presence in Canada through our headquarters team.',hq:false},
  {id:'usa',label:'USA',title:'USA',region:'North America',flag:'US',lat:39,lon:-98,marker:[204,178],description:'Connect with HabileSec’s North American presence in the USA through our headquarters team.',hq:false},
  {id:'hong-kong',label:'Hong Kong',title:'Hong Kong',region:'Asia Pacific',flag:'HK',lat:22.32,lon:114.17,marker:[664,209],description:'Connect with HabileSec’s Asia Pacific presence in Hong Kong through our headquarters team.',hq:false},
  {id:'dubai',label:'Dubai',title:'Dubai, UAE',region:'United Arab Emirates',flag:'AE',lat:25.2,lon:55.27,marker:[465,155],description:'Connect with HabileSec’s Middle East presence in Dubai through our headquarters team.',hq:false},
] as const;
export const headquartersContact={address:['46/10 Sankar Iyer Garden,','Doctor Moorthy Road,','Kumbakonam, India 612001'],phone:'+91 435-357-5243',phoneHref:'tel:+914353575243',email:'enquiry@habilesec.com'};
export const presencePoint=(lon:number,lat:number)=>[40+(lon+180)*2,52+(90-lat)*2];
