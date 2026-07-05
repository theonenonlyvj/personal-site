export default function About() {
  return (
    <section style={{ maxWidth: 680 }}>
      <h1 style={{ fontSize: 'clamp(40px, 7vw, 76px)' }}>
        <span className="grad-text">Vijay Ram</span>
      </h1>
      <p style={{ fontSize: 24, fontFamily: 'var(--font-display)', maxWidth: 640 }}>
        Engineer turned Sales Leader and Operator.
      </p>
      <p style={{ color: 'var(--ink-2)', fontSize: 18, maxWidth: 640, marginBottom: 32 }}>
        I've spent 15+ years getting medical technology to patients.
      </p>
      <p>
        I started in signal processing: 3D ultrasound in a lab at Duke, then a brain implant (BCI)
        for epilepsy at NeuroPace, then an amputation-prevention device at Podimetrics.
        What kept pulling me, though, wasn't the algorithm. It was everything between a working device
        and a patient who's actually better off — the surgeon or doctor who has to trust it, the
        hospital or clinic that has to adopt it, the team that has to sell and support it. So I followed
        it there: into the OR, into sales, into building and running teams.
      </p>
      <p>
        Fifteen years in, the lesson is that the science is just the first hurdle. The real barriers to
        adoption are about convincing people — getting a doctor to change their mind, getting a system
        to say yes, keeping a team honest about what the product actually does.
      </p>
      <p>
        The other constant has been giving back, mostly around education and the communities I've worked
        in. I co-founded Lotus, a nonprofit that grew across three Texas cities; served on the founding
        board of the Epilepsy Foundation's Austin chapter; and my partner and I started a fund to help
        kids access early education opportunities.
      </p>
      <p style={{ color: 'var(--ink-2)' }}>
        The stuff on this site is me tinkering for fun. Have feedback? Please share!
      </p>
    </section>
  )
}
