<svelte:head>
  <script type="module">
		import 'https://unpkg.com/@material/mwc-textfield@0.25.3/mwc-textfield.js?module'
	</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;400;700&display=swap" rel="stylesheet">
</svelte:head>

<script>
	
	let blueBar = 0
	let indBar = 0
	let redBar = 0

	let totalPlayers = null
	let bluePlayers = null
	let indPlayers = null
	let redPlayers = null
	
	let blueResult = 0
	let indResult = 0
	let redResult = 0

	function IsNotNumber(i) {
		if( i >= 0 )
			return false
		if( i <= 0 )
			return false
		return true;
	}

  // get the data-id from the event
  function updateValues({target}) {
    const {value: value_raw, dataset: { id }} = target
    const value = parseInt(value_raw)

    if (typeof id === 'string') {
      switch (id) {
        case 'total-players':
          totalPlayers = value ? value : 0
          break;
        case 'blue-players':
          bluePlayers = value ? value : 0
          break;
        case 'ind-players':
          indPlayers = value ? value : 0
          break;
        case 'red-players':
          redPlayers = value ? value : 0
          break;
      }
    }
    calcRatio()
  }

	function calcRatio() {
		let totalRatio = bluePlayers + indPlayers + redPlayers
		let playersRatio = totalPlayers / totalRatio

		let blueCount = playersRatio * bluePlayers
		let indCount = playersRatio * indPlayers
		let redCount = playersRatio * redPlayers

		blueResult = String(Math.round(blueCount * 10) / 10)
		indResult = String(Math.round(indCount * 10) / 10)
		redResult = String(Math.round(redCount * 10) / 10)

		// 		if (IsNotNumber(blueResult) || IsNotNumber(indResult), IsNotNumber(redResult)) {
		if (isNaN(blueResult) || isNaN(indResult), isNaN(redResult)) {
			blueResult = 0
			indResult = 0
			redResult = 0
			blueBar = 0
			indBar = 0
			redBar = 0
			return
		}
		blueBar = blueCount / totalPlayers * 100
		indBar = indCount / totalPlayers * 100
		redBar = redCount / totalPlayers * 100

	}
</script>

<div class="header">
	<h3>FNF</h3>
	<h1>PVP Ratio Calculator</h1>	
</div>

<div class="card">
	<!-- Total	 -->
	<div class="layout-grid"><!-- g  -->
		<!-- 		<div class="layout-grid__inner"> -->
		<div class="layout-grid__cell layout-grid__cell--span-2">
      <mwc-textfield
        data-id="total-players"
        outlined
        label="Players"
        type="number"
        min="0"
        on:input={updateValues}
      />
		</div>
		<!-- Blue -->
		<div class="layout-grid__cell">
      <mwc-textfield
        data-id="blue-players"
        outlined
        label="BLUE"
        type="number"
        min="0"
        on:input={updateValues}
      />
		</div>
		<!-- OPFOR -->
		<div class="layout-grid__cell">
      <mwc-textfield
        data-id="red-players"
        outlined
        label="OPFOR"
        type="number"
        min="0"
        on:input={updateValues}
      />
		</div>
		<!-- INDFOR -->
		<div class="layout-grid__cell">
      <mwc-textfield
        data-id="ind-players"
        outlined
        label="INDFOR"
        type="number"
        min="0"
        on:input={updateValues}
      />
		</div>
	</div>
	<p class="note">Enter the ratio/percentage the mission wants. For example: 20 Players, we enter 3 Blue, 1 Red. Result: 15 Blue, and 5 Red</p>
  <div class="ratio-bar">
		<div class="blue" style="width:{blueBar+'%'}"></div>
		<div class="green" style="width:{indBar+'%'}"></div>
		<div class="red" style="width:{redBar+'%'}"></div>
	</div>

	<dic class="playersCount">
		<h3>
			BLUEFOR: {blueResult} <br /> INDFOR: {indResult} <br /> OPFOR: {redResult}
		</h3>
	</dic>
</div>
<div class="footer">
	&copy; 2022 oskr.nl //
  <a href="https://fridaynightfight.org">visit FNF site</a>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #f4f4f4;
	}
	.header {
		text-align: center;
		padding: 12px 0 12px 0;
		background: #fff;
		border-bottom: 1px solid #0002;
	}
	.header h1, .header h3 {
		margin: 0;
	}
	.header h1 {
		font-size: 1.2rem;
		font-weight: 400;
	}
	.card {
		background: #fff;
		margin: 2rem auto;
		padding: 2rem 1rem;
		width: 75%;
		max-width: 532px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.layout-grid {
		display: grid;
    justify-content: center;
		grid-template-columns: repeat(auto-fit, 130px);
		grid-template-rows: 72px;
		gap: 1px 1px;
	}
	.layout-grid__cell {
		width: 120px;
	}

  p.note {
    font-size: 14px;
  }

	/* 	 */
	.ratio-bar {
		height: 18px;
		background: #eee;
		border-radius: 24px;
		overflow: hidden;
		display: flex;
	}
	.blue {
		background: #1976D2;
	}
	.green {
		background: #4caf50;
	}
	.red {
		background: #c62828;
	}
	.footer {
		padding: 2rem;
		text-align: center;
		font-size: 14px;
	}
</style>
