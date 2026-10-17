/**
 * Meta (Facebook) Business identifiers.
 *
 * Both of these are public by nature — the pixel id ships inside the page's
 * own JavaScript and the verification token sits in a meta tag — so neither
 * belongs in an environment variable.
 */

/**
 * The Meta *dataset* (pixel) id, which is what belongs in website code.
 *
 * NOTE: the value supplied was labelled both "dataset id" and "Ad account
 * ID". Those are different things in Meta Business — only the dataset/pixel
 * id makes tracking work; an ad account id in its place loads silently and
 * records nothing. Confirm in Events Manager → Data sources that this id is
 * listed there and is receiving events; if it isn't, the number needed is the
 * one shown on the dataset itself.
 */
export const META_PIXEL_ID = "2157315598491684";

/** Meta Business domain verification token (Business settings → Brand safety). */
export const META_DOMAIN_VERIFICATION = "ixdmdvgnn61ycp7kzyley37xeunkhk";
