import s from './Footer.module.css';
import Instagram from '../../assets/icons/Instagram';
import WhatsApp from '../../assets/icons/WhatsApp';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <h2 className={s.title}>Contact</h2>

        <div className={s.grid}>
          <div className={s.card}>
            <div className={s.label}>Phone</div>
            <div className={s.value}>+7 (499) 350-66-04</div>
          </div>

          <div className={s.card}>
            <div className={s.label}>Socials</div>
            <div className={s.socials}>
              <a className={s.socialLink} href="#" aria-label="Instagram">
                <Instagram size={44} />
              </a>
              <a className={s.socialLink} href="#" aria-label="WhatsApp">
                <WhatsApp size={44} />
              </a>
            </div>
          </div>

          <div className={s.card}>
            <div className={s.label}>Address</div>
            <div className={s.value}>
              Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
            </div>
          </div>

          <div className={s.card}>
            <div className={s.label}>Working Hours</div>
            <div className={s.value}>24 hours a day</div>
          </div>
        </div>

        <iframe
          className={s.map}
          src="https://maps.google.com/maps?q=Dubininskaya%20Ulitsa%2096%20Moscow&t=&z=13&ie=UTF8&iwloc=&output=embed"
          title="map"
          loading="lazy"
        />

        <div className={s.bottom}>
          Garden shop • React + RTK + Hook Form • API localhost:3333
        </div>
      </div>
    </footer>
  );
}