export default function About() {
  return (
    <section className="about" style={{ maxWidth: 560 }}>
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
        I started in signal processing: 3D ultrasound in <a href="https://bme.duke.edu/people/olaf-von-ramm/" target="_blank" rel="noopener noreferrer">a lab at Duke</a>, then a brain implant (BCI)
        for epilepsy at <a href="https://neuropace.com/" target="_blank" rel="noopener noreferrer">NeuroPace</a>, then an amputation-prevention device at <a href="https://podimetrics.com/" target="_blank" rel="noopener noreferrer">Podimetrics</a>.
        What kept pulling me, though, wasn't the algorithm. It was everything between a working device
        and a patient who's actually better off: the surgeon or doctor who has to trust it, the
        hospital or clinic that has to adopt it, the team that has to sell and support it. So I followed
        it there: into the OR, into sales, into building and running teams.
      </p>
      <p>
        Fifteen years in, the lesson is that the science is just the first hurdle. The real barriers to
        adoption are about convincing people: getting a doctor to change their mind, getting a system
        to say yes, keeping a team honest about what the product actually does.
      </p>
      <p>
        The other constant has been giving back, mostly around education and the communities I've worked
        in. I co-founded Lotus, a nonprofit that grew across three Texas cities; served on the founding
        board of the <a href="https://efcst.org/" target="_blank" rel="noopener noreferrer">Epilepsy Foundation</a>'s Austin chapter; and my partner and I started <a href="https://www.cftexas.org/donors/fund-options/vs-legacy-fund-for-education-access/" target="_blank" rel="noopener noreferrer">a fund</a> to help
        kids access early education opportunities.
      </p>
      <p>
        Lately the tinkering has a theme. I think AI is going to let each of us do far more than we can picture
        today, and I'd rather find out by building than by reading about it. So I run my house on a crew of AI
        agents I trained the way you'd onboard a new hire: give it bounds, let it draft, check the work, save the
        corrections, earn the trust. Most of the projects on this site came out of that loop.
      </p>
      <p style={{ color: 'var(--ink-2)' }}>
        Everything here is me tinkering for fun. If you have thoughts, send them!
      </p>
    </section>
  )
}
