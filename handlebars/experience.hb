<div class="col-container">
    <h4 class="title callout">Professional experience</h4>
    {{#each experience}}
        <div class="flex1 inset">
            <h3 class="lg-text title callout"> {{this.title}}</h3>

            <h5 class="title"> {{this.date}}</h5>
            <ul>
                {{#each this.description}}
                    <li>{{description this}}</li>
                {{/each}}
            </ul>
        </div>
    {{/each}}

</div>
