import {ClientPartnerNetwork} from './client-partner-network';
import {HowWeWork} from './how-we-work';
import {GlobalPresence} from './global-presence';
import {CredentialsMarquee} from './credentials-marquee';
import {GearCapabilities} from './gear-capabilities';
import {HomeSolutions} from './home-solutions';
import {SecurityHero} from './security-hero';

export function HomePage(){return <><SecurityHero/><ClientPartnerNetwork/><div id="digital-protection"><HomeSolutions/></div><GearCapabilities/><CredentialsMarquee/><HowWeWork/><GlobalPresence/></>;}
