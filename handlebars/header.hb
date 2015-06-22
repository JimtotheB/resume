

<div class="row-container">
    <div class="flex2 muteText lg-text">
        <h1 class="title callout">{{name}}</h1>
        <div class="muteText title">
            <p>{{address.line1}}
                <br>
                {{address.line2}}
            </p>
            <p>tel: {{phone}} <br>
                email: {{email}}
            </p>
        </div>

    </div>
    <div class="flex1 md-text">
        <p>
            {{#each social}}
                {{link this}}<br>
            {{/each}}
        </p>
    </div>
</div>
