<div class="row-container">
        <div class="right-border">
            <h3 class="title center callout">languages</h3>
            <p class="center inset squish-center">
                {{#each languages}}
                    <span class="md-text muteText">{{this}}</span>
                {{/each}}
            </p>
        </div>
        <div>
            <h3 class="title center callout">frameworks </h3>
            <p class="center inset squish-center">
                {{#each frameworks}}
                    <span class="md-text muteText">{{this}}</span>
                {{/each}}
            </p>

        </div>
        <div>
            <h3 class="title center callout">technologies</h3>
            <p class="center inset squish-center">
                {{#each tech}}
                    <span class="md-text muteText">{{this}}</span>
                {{/each}}
            </p>
        </div>
    </div>
<br/>
<hr class="grad" />

<div class="col-container">
    <div class="flex1">
        <h4 class="title callout">Related skills, hobbies and passions.</h4>
    </div>

    <div class="flex1 inset">
        <p class="muteText md-text">{{description skillset}}</p>
    </div>
</div>