// main bca random content script. injects the shuffle zone onto bandcamp album pages.
// shuffle zone contains the shuffle button.

function main():void
{
    injectShuffleZone();
}

/** create shuffle zone element */
function ShuffleZone():HTMLDivElement
{
    const shuffleZone:HTMLDivElement=document.createElement("div");
    shuffleZone.className="shuffle-bar";
    shuffleZone.style.padding="10px";
    shuffleZone.style.fontSize="15px";

    const shuffleButton:HTMLAnchorElement=document.createElement("a");
    shuffleButton.href="";
    shuffleButton.innerText="Shuffle";

    // on click, get a random album and open it. if ctrl is held, opens in background tab
    shuffleButton.onclick=(e:MouseEvent)=>{
        e.preventDefault();

        const randomAlbum:string|null=getRandomAlbum();

        if (randomAlbum)
        {
            if (e.ctrlKey)
            {
                window.open(randomAlbum);
            }

            else
            {
                window.location.href=randomAlbum;
            }
        }
    };

    shuffleZone.insertAdjacentElement("beforeend",shuffleButton);

    return shuffleZone;
}

/** insert shuffle zone into correct place */
function injectShuffleZone():void
{
    const insertTarget:Element|null=document.querySelector(".leftMiddleColumns");

    if (!insertTarget)
    {
        console.error("could not find parent to inject shuffle zone");
        return;
    }

    insertTarget.insertAdjacentElement("afterbegin",ShuffleZone());
}

/** scan the page and return href to a random album on the page */
function getRandomAlbum():string|null
{
    const albumLinks:Element[]=Array.from(document.querySelectorAll("#music-grid a"));

    const randomLink:Element=randomFromArray(albumLinks);

    if (!(randomLink instanceof HTMLAnchorElement))
    {
        console.error("failed to get random link element");
        return null;
    }

    return randomLink.href;
}

/** randomly pick an item from array */
function randomFromArray<T>(array:T[]):T
{
    return array[Math.floor(Math.random()*array.length)];
}

main();