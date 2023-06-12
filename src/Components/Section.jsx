//! Get rid of all props except 'children' and 'label'
import { usePupContext } from '../Providers/pup-provider';

export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
const { pupState, pupActions } = usePupContext();
const { showComponent, favoriteDogCount, unfavoriteDogCount } = pupState;
const { onClickSections } = pupActions;
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              showComponent === "favorite-dogs" && "active"
            }`}
            onClick={()=> onClickSections("favorite-dogs")}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              showComponent === "unfavorite-dogs" && "active"
            }`}
            onClick={()=> onClickSections("unfavorite-dogs")}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${
              showComponent === "create-dog-form" && "active"
            }`}
            onClick={()=> onClickSections("create-dog-form")}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
