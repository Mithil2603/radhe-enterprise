import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/RadheEnterprise.svg"

export default function Footer() {
  return (
    <>
      <footer className="bd-footer py-4 py-md-5 bg-dark text-light">
        <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <Link
                className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                to="/"
                aria-label="Radhe Enterprise"
              >
                <img src={logo} alt="main-logo" className="main-logo"/>
              </Link>
              <ul className="list-unstyled small">
                <li className="mb-2 text-light">
                  Designed and built with all the love in the world by {" "}
                  our developer Mr.{" "}
                  <Link to="https://linkedin.com/in/sutharmithil">
                    Mithil Suthar
                  </Link>
                  .
                </li>
                <li className="mb-2 text-light">
                  Code licensed{" "}
                  <Link
                    href="https://github.com/twbs/bootstrap/blob/main/LICENSE"
                    target="_blank"
                    rel="license noopener"
                  >
                    MIT
                  </Link>
                  , docs{" "}
                  <Link
                    href="https://creativecommons.org/licenses/by/3.0/"
                    target="_blank"
                    rel="license noopener"
                  >
                    CC BY 3.0
                  </Link>
                  .
                </li>
                <li className="mb-2 text-light">Currently v5.3.3.</li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 offset-lg-1 mb-3 text-light">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/">Docs</Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/examples/">Examples</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://icons.getbootstrap.com/">Icons</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://themes.getbootstrap.com/">Themes</Link>
                </li>
                <li className="mb-2">
                  <Link href="https://blog.getbootstrap.com/">Blog</Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://cottonbureau.com/people/bootstrap"
                    target="_blank"
                    rel="noopener"
                  >
                    Swag Store
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3 text-light">
              <h5>Guides</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link href="/docs/5.3/getting-started/">Getting started</Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/examples/starter-template/">
                    Starter template
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/getting-started/webpack/">Webpack</Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/getting-started/parcel/">Parcel</Link>
                </li>
                <li className="mb-2">
                  <Link href="/docs/5.3/getting-started/vite/">Vite</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3 text-light">
              <h5>Projects</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/bootstrap"
                    target="_blank"
                    rel="noopener"
                  >
                    Bootstrap 5
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/bootstrap/tree/v4-dev"
                    target="_blank"
                    rel="noopener"
                  >
                    Bootstrap 4
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/icons"
                    target="_blank"
                    rel="noopener"
                  >
                    Icons
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/rfs"
                    target="_blank"
                    rel="noopener"
                  >
                    RFS
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/examples/"
                    target="_blank"
                    rel="noopener"
                  >
                    Examples repo
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3 text-light">
              <h5>Community</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/bootstrap/issues"
                    target="_blank"
                    rel="noopener"
                  >
                    Issues
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/twbs/bootstrap/discussions"
                    target="_blank"
                    rel="noopener"
                  >
                    Discussions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://github.com/sponsors/twbs"
                    target="_blank"
                    rel="noopener"
                  >
                    Corporate sponsors
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://opencollective.com/bootstrap"
                    target="_blank"
                    rel="noopener"
                  >
                    Open Collective
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="https://stackoverflow.com/questions/tagged/bootstrap-5"
                    target="_blank"
                    rel="noopener"
                  >
                    Stack Overflow
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
