// #### make a separate js file for every Wrapper

import styled from 'styled-components';

// Styled Component
const Wrapper = styled.main`
  nav {
    // this nav is going to be applied in this particular component
    // THEREFORE, do not worry about name collisions!!!
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center; // place vertically in the center
  }
  .page {
    // 100% of screen height - the height of the nav
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center; // items in the center of my page
    margin-top: -3rem; // lift the content a little bit
  }
  h1 {
    font-weight: 700; // font a little bit bolder

    // get me the span that is on the h1
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  // on small screen hide the image
  .main-img {
    display: none;
  }

  // media queries
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
