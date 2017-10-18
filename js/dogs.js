const dogs = (function () {
  const dogList = {
    clear: {
      url: 'img/sunny.jpg',
      attribution: "<p>Image By Bodlina (Own work) [<a href='http://www.gnu.org/copyleft/fdl.html'>GFDL</a> or <a href='http://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA-3.0</a>], <a href='https://commons.wikimedia.org/wiki/File%3A7weeks_old.JPG'>via Wikimedia Commons</a></p>"},
    rain: {
      url: 'img/rain.jpg',
      attribution: '<p>Image © Nevit Dilmen [<a href=http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a> or <a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>], <a href="https://commons.wikimedia.org/wiki/File%3AGolden_retriever_swimming_1380221.jpg">via Wikimedia Commons</a></p>'},
    thunder: {
      url:  'img/thunder.jpg',
      attribution: '<p>Image by LuKaS Cuba (Own work) [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a> or <a href="http://artlibre.org/licence/lal/en">FAL</a>], <a href="https://commons.wikimedia.org/wiki/File%3AKiara.JPG">via Wikimedia Commons</a></p>'},
    cloud: {
      url:  'img/cloud.jpg',
      attribution: '<p>Image by Summerinthecity90 (Own work) [<a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3AMiniature_Pom.jpg">via Wikimedia Commons</a></p>'},
    snow: {
      url: 'img/snow.jpg',
      attribution: '<p>Image by Rainer Spickmann (Own work) [<a href="http://creativecommons.org/licenses/by-sa/2.5">CC BY-SA 2.5</a>], <a href="https://commons.wikimedia.org/wiki/File%3ALanghaardackel_merlin_2005.jpg">via Wikimedia Commons</a></p>'},
    mist: {
      url: 'img/mist.jpg',
      attribution: '<p>Image by Pets Adviser from Brooklyn, USA (2014 Westminster Kennel Club Dog Show) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3A2014_Westminster_Kennel_Club_Dog_Show_(12451551343).jpg">via Wikimedia Commons</a></p>'},
    default: {
      url: 'img/default.jpg',
      attribution: '<p>Image by Bev Sykes from Davis, CA, USA (Flickr) [<a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>], <a href="https://commons.wikimedia.org/wiki/File%3ASleeping_Pups.jpg">via Wikimedia Commons</a></p>'}
    };
  function getImage (type) {
    return dogList[type].url;
  }
  function getAttrib (type) {
    return dogList[type].attribution;
  }
  function getTypes () {
    return Object.keys(dogList);
  }
  const api = {
    getImage,
    getAttrib,
    getTypes
  };
  return api;
})();
