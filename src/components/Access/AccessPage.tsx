import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SignUpForm } from './SignUpForm';
import { UserType } from '../../types';
import illustrationKnowledgeSeeker from '../../assets/illustration-knowledge-seeker.svg';
import illustrationExpert from '../../assets/illustration-expert.svg';
import './AccessPage.css';

enum CardStatus {
  NONE = 'none',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const getCardStatus = (type: UserType | undefined, forType: UserType) => {
  const hasType = !!type;
  return hasType ? (type === forType ? CardStatus.ACTIVE : CardStatus.INACTIVE) : CardStatus.NONE;
};

const getClassNameForStatus = (status: CardStatus) => {
  switch (status) {
    case CardStatus.ACTIVE:
      return ' signup-card--active';
    case CardStatus.INACTIVE:
      return ' signup-card--inactive';
    case CardStatus.NONE:
      return '';
  }
};

type Props = {
  formTitle: string;
  linkText: string;
  linkTo: string;
  formComponent: React.FC<{ type: UserType }>;
};

/**
 * @remarks The overlay illustration has three states (as described by `CardStatus`), while `CSSTransition` can essentially only handle on/off states, this is why I am still working with `knowledgeClassName`/`expertClassName`. I suppose with more thought put into it, this could e.g. be handled with the `Transition` component and manual checks
 */
export const AccessPage: React.FC<Props> = ({ formTitle, linkText, linkTo, formComponent }) => {
  const location = useLocation();
  const { type } = useParams<{ type?: UserType }>();

  const knowledgeCardStatus = getCardStatus(type, 'knowledge-seeker');
  const knowledgeClassName = getClassNameForStatus(knowledgeCardStatus);
  const expertCardStatus = getCardStatus(type, 'expert');
  const expertClassName = getClassNameForStatus(expertCardStatus);

  return (
    <main>
      <div className="signup-cards">
        <div className={'signup-card signup-card__knowledge' + knowledgeClassName}>
          <CSSTransition
            in={knowledgeCardStatus === CardStatus.NONE}
            timeout={700}
            classNames="signup-card__button-"
            appear
            mountOnEnter
            unmountOnExit
          >
            <div className="signup-card__button">
              <Link to={`${location.pathname}/knowledge-seeker/`} className="btn btn-primary btn--big">
                Knowledge Seeker
              </Link>
            </div>
          </CSSTransition>

          <CSSTransition
            in={knowledgeCardStatus === CardStatus.ACTIVE}
            timeout={700}
            classNames="signup-card__form-"
            appear
            mountOnEnter
            unmountOnExit
          >
            <div className="signup-card__form">
              <section className="signup-section">
                <header className="section-header">
                  <h2>{formTitle}</h2>
                  <p>
                    or <Link to={linkTo}>{linkText}</Link>
                  </p>
                </header>
                <SignUpForm type="knowledge-seeker" />
              </section>
              <section className="signup-section">
                <header className="section-header">
                  <h2>I‘m just here to explore</h2>
                </header>
                <a className="btn btn-secondary">Enter as a visitor</a>
              </section>
            </div>
          </CSSTransition>
          <div className="signup-card__overlay">
            <img height="729" alt="" src={illustrationKnowledgeSeeker} className="signup__illustration" />
          </div>
        </div>

        <div className={'signup-card signup-card__expert' + expertClassName}>
          <CSSTransition
            in={expertCardStatus === CardStatus.NONE}
            timeout={700}
            classNames="signup-card__button-"
            appear
            mountOnEnter
            unmountOnExit
          >
            <div className="signup-card__button">
              <Link to={`${location.pathname}/expert`} className="btn btn-primary btn--big">
                Expert
              </Link>
            </div>
          </CSSTransition>

          <CSSTransition
            in={expertCardStatus === CardStatus.ACTIVE}
            timeout={700}
            classNames="signup-card__form-"
            appear
            mountOnEnter
            unmountOnExit
          >
            <div className="signup-card__form">
              <section className="signup-section">
                <header className="section-header">
                  <h2>{formTitle}</h2>
                  <p>
                    or <Link to={linkTo}>{linkText}</Link>
                  </p>
                </header>
                {React.createElement(formComponent)}
              </section>
              <section className="signup-section">
                <header className="section-header">
                  <h2>I‘m just here to explore</h2>
                </header>
                <a className="btn btn-secondary">Enter as a visitor</a>
              </section>
            </div>
          </CSSTransition>
          <div className="signup-card__overlay">
            <img height="729" alt="" src={illustrationExpert} className="signup__illustration" />
          </div>
        </div>
      </div>
    </main>
  );
};
